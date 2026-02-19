
export function formatValue(val: unknown): string {
    if (val === null || val === undefined) {
        return "NULL";
    }
    if (typeof val === "object") {
        return JSON.stringify(val);
    }
    return String(val);
}


export function convertToJson(
    columns: string[],
    values: unknown[][]
): Record<string, unknown>[] {
    return values.map((row) => {
        const obj: Record<string, unknown> = {};
        columns.forEach((col, idx) => {
            obj[col] = row[idx];
        });
        return obj;
    });
}
