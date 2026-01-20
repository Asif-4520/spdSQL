import { ensureInitialized } from "../core";
import { formatValueForCSV } from "./formatters";
import { downloadFile } from "./download";

export const exportTableAsCSV = async (tableName: string): Promise<void> => {
    const { con } = await ensureInitialized();

    const result = await con.query(`SELECT * FROM "${tableName}"`);
    const rows = result.toArray().map((r: any) => r.toJSON());

    if (rows.length === 0) {
        throw new Error(`Table "${tableName}" is empty`);
    }

    const columns = Object.keys(rows[0]);
    const header = columns.join(",");
    const csvRows = rows.map((row: any) =>
        columns.map((col) => formatValueForCSV(row[col])).join(",")
    );
    const csv = [header, ...csvRows].join("\n");

    downloadFile(csv, `${tableName}.csv`, "text/csv;charset=utf-8;");
};
