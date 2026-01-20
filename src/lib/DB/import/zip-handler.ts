import JSZip from "jszip";
import { ensureInitialized, loadExtension } from "../core";

const getTableNameFromFile = (fileName: string): string => {
    return fileName.split(".")[0].replace(/[^a-zA-Z0-9_]/g, "_");
};

export const importZipFile = async (file: File): Promise<string> => {
    const { db, con } = await ensureInitialized();

    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    const parquetFiles = Object.keys(zip.files).filter(
        (name) => name.endsWith(".parquet") && !zip.files[name].dir
    );

    if (parquetFiles.length === 0) {
        throw new Error("No Parquet files found in ZIP");
    }

    await loadExtension("parquet");

    let imported = 0;
    for (const fileName of parquetFiles) {
        const fileData = await zip.files[fileName].async("uint8array");
        const tableName = getTableNameFromFile(fileName);

        await db.registerFileBuffer(fileName, fileData);
        await con.query(
            `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_parquet('${fileName}')`
        );
        imported++;
    }

    return `Imported ${imported} table${imported !== 1 ? "s" : ""} from ZIP`;
};
