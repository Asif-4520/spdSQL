import { ensureInitialized, loadExtension } from "../core";
import { downloadFile } from "./download";

export const exportTableAsJSON = async (tableName: string): Promise<void> => {
    const { con } = await ensureInitialized();
    await loadExtension("json");

    const result = await con.query(`SELECT * FROM "${tableName}"`);
    const rows = result.toArray().map((r: any) => r.toJSON());
    const json = JSON.stringify(rows, null, 2);

    downloadFile(json, `${tableName}.json`, "application/json");
};
