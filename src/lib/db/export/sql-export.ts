import { ensureInitialized } from "../core";
import { getTables, getTableColumns } from "../query";
import { formatValueForSQL } from "./formatters";
import { downloadFile } from "./download";

export const exportDatabaseAsSQL = async (): Promise<string> => {
    const { con } = await ensureInitialized();
    const tableNames = await getTables();

    let sqlDump = `-- spdSQL Database Export\n-- Generated at ${new Date().toISOString()}\n\n`;

    for (const tableName of tableNames) {
        const columns = await getTableColumns(tableName);
        const colDefs = columns
            .map((c) => `    ${c.column_name} ${c.data_type}`)
            .join(",\n");

        sqlDump += `CREATE TABLE IF NOT EXISTS "${tableName}" (\n${colDefs}\n);\n\n`;

        const dataResult = await con.query(`SELECT * FROM "${tableName}"`);
        const rows = dataResult.toArray().map((r: any) => r.toJSON());

        if (rows.length > 0) {
            const colNames = columns.map((c) => c.column_name);
            for (const row of rows) {
                const values = colNames.map((col) => {
                    const val = row[col];
                    const type = columns.find(
                        (c) => c.column_name === col
                    )?.data_type;
                    return formatValueForSQL(val, type);
                });

                sqlDump += `INSERT INTO "${tableName}" (${colNames.join(
                    ", "
                )}) VALUES (${values.join(", ")});\n`;
            }
            sqlDump += "\n";
        }
    }

    return sqlDump;
};

export const saveDatabase = async (): Promise<void> => {
    const sqlDump = await exportDatabaseAsSQL();
    downloadFile(sqlDump, `spdSQL_export_${Date.now()}.sql`, "text/sql");
};
