import { ensureInitialized } from "../core";

const getTableNameFromFile = (fileName: string): string => {
    return fileName.split(".")[0].replace(/[^a-zA-Z0-9_]/g, "_");
};

export const importExcelFile = async (file: File): Promise<string> => {
    const { db, con } = await ensureInitialized();
    const fileName = file.name;
    const tableName = getTableNameFromFile(fileName);

    const text = await file.text();
    const lines = text
        .replace(/^\uFEFF/, "")
        .split("\n")
        .filter((l) => l.trim());

    if (lines.length === 0) {
        throw new Error("Excel file is empty");
    }

    const csvContent = lines
        .map((line) => {
            const cells = line.split("\t");
            return cells
                .map((cell) => {
                    const val = cell.trim();
                    if (
                        val.includes(",") ||
                        val.includes('"') ||
                        val.includes("\n")
                    ) {
                        return `"${val.replace(/"/g, '""')}"`;
                    }
                    return val;
                })
                .join(",");
        })
        .join("\n");

    const csvFileName = `${tableName}.csv`;
    const encoder = new TextEncoder();
    await db.registerFileBuffer(csvFileName, encoder.encode(csvContent));
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_csv_auto('${csvFileName}')`
    );
    return `Table "${tableName}" created from Excel file`;
};
