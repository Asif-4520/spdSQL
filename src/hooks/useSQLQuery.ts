import { useState, useCallback } from "react";
import { runSQL } from "../lib/db";
import type { QueryResponse } from "../lib/db";
import toast from "react-hot-toast";

export function useSQLQuery() {
    const [result, setResult] = useState<QueryResponse | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const execute = useCallback(async (query: string) => {
        if (!query.trim()) {
            return null;
        }

        setIsRunning(true);
        try {
            const res = (await runSQL(query)) as QueryResponse;
            setResult(res);
            if (res.error) {
                toast.error(res.error);
            }
            return res;
        } catch (err: any) {
            const errorMsg = err.message || "Execution failed";
            const errorRes: QueryResponse = {
                data: null,
                error: errorMsg,
                timeMs: 0,
            };
            setResult(errorRes);
            toast.error(errorMsg);
            return errorRes;
        } finally {
            setIsRunning(false);
        }
    }, []);

    const clearResult = useCallback(() => setResult(null), []);

    return {
        result,
        isRunning,
        execute,
        clearResult,
    };
}
