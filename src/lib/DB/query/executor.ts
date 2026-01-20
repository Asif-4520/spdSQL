import { ensureInitialized } from "../core";
import {
    detectStatementType,
    isRowReturningStatement,
    isDMLStatement,
} from "./statement-detector";
import type { StatementType } from "./statement-detector";

export interface StructuredQueryResult {
    statementType: StatementType;
    columns?: string[];
    columnTypes?: string[];
    values?: unknown[][];
    rowCount?: number;
    affectedRows?: number;
    success: boolean;
    error?: string;
    timeMs: number;
}

export const executeSQL = async (
    sql: string
): Promise<StructuredQueryResult> => {
    const start = performance.now();
    const statementType = detectStatementType(sql);

    try {
        const { con } = await ensureInitialized();
        const result = await con.query(sql);
        const timeMs = Math.round(performance.now() - start);

        if (isRowReturningStatement(statementType)) {
            const rows = result.toArray();
            const columns: string[] = [];
            const columnTypes: string[] = [];

            for (let i = 0; i < result.numCols; i++) {
                const field = result.schema.fields[i];
                columns.push(field.name);
                columnTypes.push(String(field.type));
            }

            const values = rows.map((row) => {
                const json = row.toJSON();
                return columns.map((col) => json[col]);
            });

            return {
                statementType,
                columns,
                columnTypes,
                values,
                rowCount: values.length,
                success: true,
                timeMs,
            };
        }

        if (isDMLStatement(statementType)) {
            let affectedRows = 0;
            try {
                const rows = result.toArray();
                if (rows.length > 0) {
                    const firstRow = rows[0].toJSON();
                    affectedRows =
                        (firstRow as { Count?: number; count?: number })
                            .Count ??
                        (firstRow as { Count?: number; count?: number })
                            .count ??
                        rows.length;
                }
            } catch (_err) {
                affectedRows = 0;
            }
            return { statementType, affectedRows, success: true, timeMs };
        }

        return { statementType, success: true, timeMs };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return {
            statementType: "ERROR",
            success: false,
            error: message,
            timeMs: Math.round(performance.now() - start),
        };
    }
};
