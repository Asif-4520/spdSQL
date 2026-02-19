import { useCallback } from "react";
import { runSQL } from "../lib/db/duckdb.service";
import { useStateContext } from "../context/GlobalContext";
import { useSettingsStore } from "../store";
import type { QueryResponse } from "../lib/db";

export interface RunQueryOptions {
    /**
     * Override the SQL text to execute. If omitted, the current editor value (or cached Query) is used.
     */
    query?: string;
    /**
     * Skip history persistence for system-triggered executions (e.g., schema refresh).
     */
    skipHistory?: boolean;
}

export interface RunQueryResult extends QueryResponse {
    success: boolean;
}

/**
 * Single place to execute SQL and keep app state in sync (status, history, timings, errors).
 */
export function useQueryRunner() {
    const ctx = useStateContext();
    const { autoSaveHistory } = useSettingsStore();

    const resolveQueryText = useCallback(
        (queryOverride?: string) => {
            if (queryOverride && queryOverride.trim()) {
                return queryOverride;
            }
            if (typeof ctx.editorGetValue === "function") {
                return ctx.editorGetValue();
            }
            return ctx.Query;
        },
        [ctx]
    );

    const runQuery = useCallback(
        async (options?: RunQueryOptions): Promise<RunQueryResult> => {
            const sql = resolveQueryText(options?.query);
            const started = performance.now();

            ctx.setExecStatus("running");
            ctx.setQueryError(null);
            ctx.setQueryResult(null);
            ctx.setExecTimeMs(null);

            try {
                const { data, error, timeMs } = await runSQL(sql);
                const duration =
                    typeof timeMs === "number"
                        ? timeMs
                        : Math.round(performance.now() - started);

                if (error) {
                    ctx.setQueryError(error);
                    ctx.setExecStatus("error");
                    ctx.setExecTimeMs(duration);
                    if (!options?.skipHistory && autoSaveHistory) {
                        ctx.addHistory(sql, "error");
                    }
                    return {
                        success: false,
                        data: null,
                        error,
                        timeMs: duration,
                    };
                }

                ctx.setQueryResult(data);
                ctx.setExecStatus("ready");
                ctx.setExecTimeMs(duration);
                if (!options?.skipHistory && autoSaveHistory) {
                    ctx.addHistory(sql, "success");
                }

                return { success: true, data, error: null, timeMs: duration };
            } catch (err: unknown) {
                const message =
                    err instanceof Error ? err.message : String(err);
                const duration = Math.round(performance.now() - started);
                ctx.setQueryError(message);
                ctx.setExecStatus("error");
                ctx.setExecTimeMs(duration);
                if (!options?.skipHistory && autoSaveHistory) {
                    ctx.addHistory(sql, "error");
                }
                return {
                    success: false,
                    data: null,
                    error: message,
                    timeMs: duration,
                };
            }
        },
        [autoSaveHistory, ctx, resolveQueryText]
    );

    return { runQuery };
}

export default useQueryRunner;
