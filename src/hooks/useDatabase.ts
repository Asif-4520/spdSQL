import { useState, useEffect, useCallback } from 'react';
import { initDuckDB } from '../lib/DB/duckdb.service';
import { useQueryRunner } from './useQueryRunner';

export function useDatabase() {
    const [isReady, setIsReady] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { runQuery } = useQueryRunner();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setIsInitializing(true);
                await initDuckDB();
                if (mounted) {
                    setIsReady(true);
                    setError(null);
                }
            } catch (err: unknown) {
                if (mounted) {
                    const message =
                        err instanceof Error
                            ? err.message
                            : 'Failed to initialize database';
                    setError(message);
                }
            } finally {
                if (mounted) setIsInitializing(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const executeQuery = useCallback(
        async (query?: string) => runQuery({ query }),
        [runQuery]
    );

    return { isReady, isInitializing, error, executeQuery };
}

export default useDatabase;
