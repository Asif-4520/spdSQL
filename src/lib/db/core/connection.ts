import * as duckdb from "@duckdb/duckdb-wasm";
import { BUNDLES } from "./bundles";

let db: duckdb.AsyncDuckDB | null = null;
let con: duckdb.AsyncDuckDBConnection | null = null;

export const getDB = () => db;

export const getConnection = () => con;

export const isInitialized = () => con !== null;

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
