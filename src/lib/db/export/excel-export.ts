import { ensureInitialized, loadExtension } from "../core";
import { downloadFile } from "./download";

export const exportTableAsExcel = async (tableName: string): Promise<void> => {
    const { con } = await ensureInitialized();
    await loadExtension("excel");

    const result = await con.query(`SELECT * FROM "${tableName}"`);
    const rows = result.toArray().map((r: any) => r.toJSON());

    if (rows.length === 0) {
        throw new Error(`Table "${tableName}" is empty`);
    }

    const columns = Object.keys(rows[0]);
    const header = columns.join("\t");
    const csvRows = rows.map((row: any) =>
        columns
            .map((col) => {
                const val = row[col];
                if (val === null || val === undefined) {
                    return "";
                }
                return String(val).replace(/\t/g, " ").replace(/\n/g, " ");
            })
            .join("\t")
    );

    const bom = "\uFEFF";
    const content = bom + [header, ...csvRows].join("\n");

    downloadFile(
        content,
        `${tableName}.xls`,
        "application/vnd.ms-excel;charset=utf-8;"
    );
};
