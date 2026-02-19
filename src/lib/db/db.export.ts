import { ensureInitialized, type ColumnInfo, loadExtension } from "./db.core";
import { getTables, getTableColumns } from "./db.query";
import JSZip from "jszip";

const downloadFile = (
    content: string | Uint8Array | ArrayBuffer,
    filename: string,
    type: string
): void => {
    let blob: Blob;
    if (content instanceof Uint8Array) {
        const arrayBuffer = new ArrayBuffer(content.byteLength);
        new Uint8Array(arrayBuffer).set(content);
        blob = new Blob([arrayBuffer], { type });
    } else {
        blob = new Blob([content], { type });
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const formatValueForSQL = (val: any, type: string | undefined): string => {
    if (val === null || val === undefined) {
        return "NULL";
    }

    if (type === "DATE") {
        if (typeof val === "number") {
            const d = new Date(val);
            return `'${d.toISOString().split("T")[0]}'`;
        }
        return `'${val}'`;
    }

    if (type?.includes("TIMESTAMP")) {
        if (typeof val === "number") {
            const d = new Date(val);
            return `'${d.toISOString().replace("T", " ").replace("Z", "")}'`;
        }
        const strVal = String(val).replace(/[+-]\d{2}:\d{2}$/, "");
        return `'${strVal}'`;
    }

    if (type === "TIME") {
        return `'${val}'`;
    }

    if (typeof val === "string") {
        return `'${val.replace(/'/g, "''")}'`;
    }

    return String(val);
};

const formatValueForCSV = (val: any): string => {
    if (val === null || val === undefined) {
        return "";
    }
    const str = String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
};

export const exportDatabaseAsSQL = async (): Promise<string> => {
    const { con } = await ensureInitialized();
    const tableNames = await getTables();

    let sqlDump = `-- spdSQL Database Export\n-- Generated at ${new Date().toISOString()}\n\n`;

    for (const tableName of tableNames) {
        const columns = await getTableColumns(tableName);
        const colDefs = columns
            .map((c: ColumnInfo) => `    ${c.column_name} ${c.data_type}`)
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

export const exportTableAsJSON = async (tableName: string): Promise<void> => {
    const { con } = await ensureInitialized();
    await loadExtension("json");

    const result = await con.query(`SELECT * FROM "${tableName}"`);
    const rows = result.toArray().map((r: any) => r.toJSON());
    const json = JSON.stringify(rows, null, 2);

    downloadFile(json, `${tableName}.json`, "application/json");
};

export const exportTableAsParquet = async (
    tableName: string
): Promise<void> => {
    const { db, con } = await ensureInitialized();
    await loadExtension("parquet");
    const fileName = `${tableName}.parquet`;

    await con.query(`COPY "${tableName}" TO '${fileName}' (FORMAT PARQUET)`);
    const buffer = await db.copyFileToBuffer(fileName);

    downloadFile(buffer, fileName, "application/octet-stream");
};

export const exportAllTablesAsParquet = async (): Promise<void> => {
    const { db, con } = await ensureInitialized();
    await loadExtension("parquet");
    const tableNames = await getTables();

    if (tableNames.length === 0) {
        throw new Error("No tables to export");
    }

    const zip = new JSZip();

    for (const tableName of tableNames) {
        const fileName = `${tableName}.parquet`;
        await con.query(
            `COPY "${tableName}" TO '${fileName}' (FORMAT PARQUET)`
        );
        const buffer = await db.copyFileToBuffer(fileName);
        zip.file(fileName, buffer);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `database_backup_${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

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
