/**
 * Deeply compares user query results against reference solution results.
 * Checks for:
 * 1. Column names and order
 * 2. Total row count
 * 3. Exact values in each cell
 */
export interface ValidationResult {
    isValid: boolean;
    error?: {
        type: 'column_mismatch' | 'row_count_mismatch' | 'data_mismatch' | 'generic';
        message: string;
        details?: any;
    };
}

export function validateQueryResult(userRows: any[], solutionRows: any[]): ValidationResult {
    if (!userRows || !solutionRows) {
        return { isValid: false, error: { type: 'generic', message: 'Missing results to compare.' } };
    }

    // 1. Check columns
    const userCols = userRows.length > 0 ? Object.keys(userRows[0]) : [];
    const solutionCols = solutionRows.length > 0 ? Object.keys(solutionRows[0]) : [];

    if (userCols.length !== solutionCols.length) {
        return {
            isValid: false,
            error: {
                type: 'column_mismatch',
                message: `Expected ${solutionCols.length} columns, but got ${userCols.length}.`,
                details: { expected: solutionCols, received: userCols }
            }
        };
    }

    const colMismatch = solutionCols.find((col, i) => userCols[i] !== col);
    if (colMismatch) {
        return {
            isValid: false,
            error: {
                type: 'column_mismatch',
                message: `Column mismatch. Expected "${colMismatch}", but found "${userCols[solutionCols.indexOf(colMismatch)]}".`,
                details: { expected: solutionCols, received: userCols }
            }
        };
    }

    // 2. Check row count
    if (userRows.length !== solutionRows.length) {
        return {
            isValid: false,
            error: {
                type: 'row_count_mismatch',
                message: `Expected ${solutionRows.length} rows, but got ${userRows.length}.`,
                details: { expected: solutionRows.length, received: userRows.length }
            }
        };
    }

    // 3. Deep compare data
    for (let i = 0; i < solutionRows.length; i++) {
        const sRow = solutionRows[i];
        const uRow = userRows[i];

        for (const col of solutionCols) {
            const sVal = sRow[col];
            const uVal = uRow[col];

            // Flexible comparison for dates/numbers
            if (String(sVal) !== String(uVal)) {
                return {
                    isValid: false,
                    error: {
                        type: 'data_mismatch',
                        message: `Data mismatch at row ${i + 1}, column "${col}". Expected "${sVal}", but got "${uVal}".`,
                    }
                };
            }
        }
    }

    return { isValid: true };
}
