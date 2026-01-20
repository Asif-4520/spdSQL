import { ensureInitialized } from "../core";
import type { SchemaRow, ColumnInfo } from "../core/types";

export const getSchema = async (): Promise<SchemaRow[]> => {
    const { con } = await ensureInitialized();
    const result = await con.query(`
        SELECT table_name, column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'main'
        ORDER BY table_name, ordinal_position
    `);
    return result.toArray().map((r) => r.toJSON()) as SchemaRow[];
};

export const getTables = async (): Promise<string[]> => {
    const { con } = await ensureInitialized();
    const result = await con.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'main'`
    );
    return result
        .toArray()
        .map((r) => (r.toJSON() as { table_name: string }).table_name);
};

export const getTableColumns = async (
    tableName: string
): Promise<ColumnInfo[]> => {
    const { con } = await ensureInitialized();
    const result = await con.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = '${tableName}' AND table_schema = 'main'
        ORDER BY ordinal_position
    `);
    return result.toArray().map((r) => r.toJSON()) as ColumnInfo[];
};

export const resetDB = async (): Promise<void> => {
    const { con } = await ensureInitialized();
    const tables = await con.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'main'`
    );
    for (const row of tables.toArray()) {
        const tableName = (row.toJSON() as { table_name: string }).table_name;
        await con.query(`DROP TABLE IF EXISTS "${tableName}"`);
    }
};

export const tableExists = async (tableName: string): Promise<boolean> => {
    const tables = await getTables();
    return tables.includes(tableName);
};

export const explainSQL = async (sql: string): Promise<string> => {
    const { con } = await ensureInitialized();
    const result = await con.query(`EXPLAIN ${sql}`);
    const rows = result.toArray().map((r) => r.toJSON());
    return JSON.stringify(rows, null, 2);
};
