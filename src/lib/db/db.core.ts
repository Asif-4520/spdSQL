import * as duckdb from "@duckdb/duckdb-wasm";
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import mvp_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";

const BUNDLES: duckdb.DuckDBBundles = {
    mvp: { mainModule: duckdb_wasm, mainWorker: mvp_worker },
    eh: { mainModule: duckdb_wasm_eh, mainWorker: eh_worker },
};

let db: duckdb.AsyncDuckDB | null = null;
let con: duckdb.AsyncDuckDBConnection | null = null;

const loadedExtensions = new Set<string>();

export const getDB = () => db;

export const getConnection = () => con;

export const isInitialized = () => con !== null;

export const loadExtension = async (
    extensionName: "json" | "sqlite_scanner" | "parquet" | "excel"
): Promise<void> => {
    if (!con) {
        await initDuckDB();
    }

    if (loadedExtensions.has(extensionName)) {
        return;
    }

    await con!.query(`LOAD '/extension/${extensionName}.wasm';`);
    loadedExtensions.add(extensionName);
};

export const initDuckDB = async (): Promise<void> => {
    if (con) {
        return;
    }

    const bundle = await duckdb.selectBundle(BUNDLES);
    const worker = new Worker(bundle.mainWorker!);
    const logger = new duckdb.VoidLogger();

    db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

    con = await db.connect();
};

export const ensureInitialized = async (): Promise<{
    db: duckdb.AsyncDuckDB;
    con: duckdb.AsyncDuckDBConnection;
}> => {
    if (!con || !db) {
        await initDuckDB();
    }
    return { db: db!, con: con! };
};

export interface QueryResult {
    columns: string[];
    values: unknown[][];
    columnTypes?: string[];
    statementType?: string;
    rowCount?: number;
    affectedRows?: number;
}

export interface QueryResponse {
    data: QueryResult[] | null;
    error: string | null;
    timeMs: number;
}

export interface ColumnInfo {
    column_name: string;
    data_type: string;
}

export interface SchemaRow {
    table_name: string;
    column_name: string;
    data_type: string;
}

export { duckdb };
