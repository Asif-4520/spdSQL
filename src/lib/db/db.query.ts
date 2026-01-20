import {
    ensureInitialized,
    type QueryResult,
    type QueryResponse,
    type SchemaRow,
} from "./db.core";

export type StatementType =
    | "SELECT"
    | "INSERT"
    | "UPDATE"
    | "DELETE"
    | "CREATE"
    | "DROP"
    | "ALTER"
    | "TRUNCATE"
    | "BEGIN"
    | "COMMIT"
    | "ROLLBACK"
    | "SET"
    | "PRAGMA"
    | "EXPLAIN"
    | "DESCRIBE"
    | "SHOW"
    | "COPY"
    | "EXPORT"
    | "IMPORT"
    | "UNKNOWN"
    | "ERROR";

export interface StructuredQueryResult {
    statementType: StatementType;
    columns?: string[];
    columnTypes?: string[];
    values?: unknown[][];
    rowCount?: number;
    affectedRows?: number;
    success: boolean;
    error?: string;
    timeMs: number;
}

const detectStatementType = (sql: string): StatementType => {
    const s = sql.trim().toUpperCase();
    if (s.startsWith("SELECT") || s.startsWith("WITH")) {
        return "SELECT";
    }
    if (s.startsWith("INSERT")) {
        return "INSERT";
    }
    if (s.startsWith("UPDATE")) {
        return "UPDATE";
    }
    if (s.startsWith("DELETE")) {
        return "DELETE";
    }
    if (s.startsWith("CREATE")) {
        return "CREATE";
    }
    if (s.startsWith("DROP")) {
        return "DROP";
    }
    if (s.startsWith("ALTER")) {
        return "ALTER";
    }
    if (s.startsWith("TRUNCATE")) {
        return "TRUNCATE";
    }
    if (s.startsWith("BEGIN")) {
        return "BEGIN";
    }
    if (s.startsWith("COMMIT")) {
        return "COMMIT";
    }
    if (s.startsWith("ROLLBACK")) {
        return "ROLLBACK";
    }
    if (s.startsWith("SET")) {
        return "SET";
    }
    if (s.startsWith("PRAGMA")) {
        return "PRAGMA";
    }
    if (s.startsWith("EXPLAIN")) {
        return "EXPLAIN";
    }
    if (s.startsWith("DESCRIBE") || s.startsWith("DESC")) {
        return "DESCRIBE";
    }
    if (s.startsWith("SHOW")) {
        return "SHOW";
    }
    if (s.startsWith("COPY")) {
        return "COPY";
    }
    if (s.startsWith("EXPORT")) {
        return "EXPORT";
    }
    if (s.startsWith("IMPORT")) {
        return "IMPORT";
    }
    return "UNKNOWN";
};

export const isRowReturningStatement = (type: StatementType) =>
    ["SELECT", "SHOW", "DESCRIBE", "EXPLAIN", "PRAGMA"].includes(type);

export const isDMLStatement = (type: StatementType) =>
    ["INSERT", "UPDATE", "DELETE"].includes(type);

export const isDDLStatement = (type: StatementType) =>
    ["CREATE", "DROP", "ALTER", "TRUNCATE"].includes(type);

export const executeSQL = async (
    sql: string
): Promise<StructuredQueryResult> => {
    const start = performance.now();
    const statementType = detectStatementType(sql);

    try {
        const { con } = await ensureInitialized();
        const result = await con.query(sql);
        const timeMs = Math.round(performance.now() - start);

        if (isRowReturningStatement(statementType)) {
            const rows = result.toArray();
            const columns: string[] = [];
            const columnTypes: string[] = [];

            for (let i = 0; i < result.numCols; i++) {
                const field = result.schema.fields[i];
                columns.push(field.name);
                columnTypes.push(String(field.type));
            }

            const values = rows.map((row) => {
                const json = row.toJSON();
                return columns.map((col) => json[col]);
            });

            return {
                statementType,
                columns,
                columnTypes,
                values,
                rowCount: values.length,
                success: true,
                timeMs,
            };
        }

        if (isDMLStatement(statementType)) {
            let affectedRows = 0;
            try {
                const rows = result.toArray();
                if (rows.length > 0) {
                    const firstRow = rows[0].toJSON();
                    affectedRows =
                        (firstRow as { Count?: number; count?: number })
                            .Count ??
                        (firstRow as { Count?: number; count?: number })
                            .count ??
                        rows.length;
                }
            } catch {
                affectedRows = 0;
            }
            return { statementType, affectedRows, success: true, timeMs };
        }

        return { statementType, success: true, timeMs };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return {
            statementType: "ERROR",
            success: false,
            error: message,
            timeMs: Math.round(performance.now() - start),
        };
    }
};

export const runSQL = async (sql: string): Promise<QueryResponse> => {
    const result = await executeSQL(sql);

    if (!result.success) {
        return {
            data: null,
            error: result.error || "Query failed",
            timeMs: result.timeMs,
        };
    }

    const data: QueryResult[] = [
        {
            columns: result.columns || [],
            columnTypes: result.columnTypes,
            values: result.values || [],
            statementType: result.statementType,
            affectedRows: result.affectedRows,
            rowCount: result.rowCount,
        },
    ];

    return { data, error: null, timeMs: result.timeMs };
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

export const explainSQL = async (
    sql: string
): Promise<Record<string, unknown>[]> => {
    const { con } = await ensureInitialized();
    const result = await con.query(`EXPLAIN ${sql}`);
    return result.toArray().map((r) => r.toJSON() as Record<string, unknown>);
};

export const getTableColumns = async (
    tableName: string
): Promise<{ column_name: string; data_type: string }[]> => {
    const { con } = await ensureInitialized();
    const escapedTableName = tableName.replace(/'/g, "''");
    const result = await con.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = '${escapedTableName}' AND table_schema = 'main'
        ORDER BY ordinal_position
    `);
    return result
        .toArray()
        .map((r) => r.toJSON() as { column_name: string; data_type: string });
};

export const tableExists = async (tableName: string): Promise<boolean> => {
    const tables = await getTables();
    return tables.includes(tableName);
};
