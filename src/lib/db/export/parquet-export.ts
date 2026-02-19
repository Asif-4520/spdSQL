import JSZip from "jszip";
import { ensureInitialized, loadExtension } from "../core";
import { getTables } from "../query";
import { downloadFile } from "./download";

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
