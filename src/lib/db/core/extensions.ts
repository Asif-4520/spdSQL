import { getConnection, initDuckDB } from "./connection";

const loadedExtensions = new Set<string>();

export type ExtensionName = "json" | "sqlite_scanner" | "parquet" | "excel";

export const loadExtension = async (
    extensionName: ExtensionName
): Promise<void> => {
    const con = getConnection();

    if (!con) {
        await initDuckDB();
    }

    if (loadedExtensions.has(extensionName)) {
        return;
    }

    const connection = getConnection();
    await connection!.query(`LOAD '/extension/${extensionName}.wasm';`);
    loadedExtensions.add(extensionName);
};

export const isExtensionLoaded = (extensionName: ExtensionName): boolean => {
    return loadedExtensions.has(extensionName);
};
