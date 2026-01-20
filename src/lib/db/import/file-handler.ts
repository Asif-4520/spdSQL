import { ensureInitialized, duckdb, loadExtension } from "../core";

const getTableNameFromFile = (fileName: string): string => {
    return fileName.split(".")[0].replace(/[^a-zA-Z0-9_]/g, "_");
};

export const importCSVFile = async (file: File): Promise<string> => {
    const { db, con } = await ensureInitialized();
    const fileName = file.name;
    const tableName = getTableNameFromFile(fileName);

    await db.registerFileHandle(
        fileName,
        file,
        duckdb.DuckDBDataProtocol.BROWSER_FILEREADER,
        true
    );
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_csv_auto('${fileName}')`
    );
    return `Table "${tableName}" created from CSV`;
};

export const importJSONFile = async (file: File): Promise<string> => {
    const { db, con } = await ensureInitialized();
    await loadExtension("json");
    const fileName = file.name;
    const tableName = getTableNameFromFile(fileName);

    await db.registerFileHandle(
        fileName,
        file,
        duckdb.DuckDBDataProtocol.BROWSER_FILEREADER,
        true
    );
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_json_auto('${fileName}')`
    );
    return `Table "${tableName}" created from JSON`;
};

export const importParquetFile = async (file: File): Promise<string> => {
    const { db, con } = await ensureInitialized();
    await loadExtension("parquet");
    const fileName = file.name;
    const tableName = getTableNameFromFile(fileName);

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    await db.registerFileBuffer(fileName, uint8Array);
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_parquet('${fileName}')`
    );

    return `Table "${tableName}" created from Parquet file`;
};

export const importSQLFile = async (file: File): Promise<string> => {
    const { con } = await ensureInitialized();
    const text = await file.text();
    await con.query(text);
    return "SQL executed successfully";
};
