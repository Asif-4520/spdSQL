import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';

import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

import type * as duckdb from '@duckdb/duckdb-wasm';

export function getDevBundles(): duckdb.DuckDBBundles {
    return {
        eh: { mainModule: duckdb_wasm_eh, mainWorker: eh_worker },
        mvp: { mainModule: duckdb_wasm, mainWorker: mvp_worker },
    };
}
