import { executeSQL } from "./executor";
import type { QueryResponse, QueryResult } from "../core/types";

export const runSQL = async (sql: string): Promise<QueryResponse> => {
    const result = await executeSQL(sql);

    if (!result.success) {
        return {
            data: null,
            error: result.error || "Query failed",
            timeMs: result.timeMs,
        };
    }

    const data: QueryResult[] = [
        {
            columns: result.columns || [],
            columnTypes: result.columnTypes,
            values: result.values || [],
            statementType: result.statementType,
            affectedRows: result.affectedRows,
            rowCount: result.rowCount,
        },
    ];

    return { data, error: null, timeMs: result.timeMs };
};
