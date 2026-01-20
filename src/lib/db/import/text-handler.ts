import { ensureInitialized, loadExtension } from "../core";

export const importCSVText = async (
    content: string,
    tableName: string
): Promise<string> => {
    const { db, con } = await ensureInitialized();
    const fileName = `${tableName}.csv`;

    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(content);

    await db.registerFileBuffer(fileName, uint8Array);
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_csv_auto('${fileName}')`
    );

    return `Table "${tableName}" created from CSV text`;
};

export const importJSONText = async (
    content: string,
    tableName: string
): Promise<string> => {
    const { db, con } = await ensureInitialized();
    await loadExtension("json");
    const fileName = `${tableName}.json`;
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(content);
    await db.registerFileBuffer(fileName, uint8Array);
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_json_auto('${fileName}')`
    );
    return `Table "${tableName}" created from JSON text`;
};
