// Core types for rule schemas and validation results

export type PrimitiveType =
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "null"
    | "unknown";

export interface ColumnSchema {
    required?: string[]; // columns that must exist
    exact?: boolean; // if true, only the required columns are allowed
    types?: Record<string, PrimitiveType>; // column type expectations
}

export interface RowCountRule {
    value: number;
    strict?: boolean; // when true, count must equal value; otherwise value is minimum
}

export interface RowsSchema {
    count?: RowCountRule; // total rows rule
    min?: number; // minimum rows
    max?: number; // maximum rows
    distinct?: string[] | string[][]; // unique columns per row, supports composite keys
    notEmpty?: boolean; // rows array must not be empty
    ordered?: boolean; // if true, row order must match exactly
}

export interface BetweenRule {
    min: number;
    max: number;
    inclusive?: boolean;
}

export interface LengthRule {
    min?: number;
    max?: number;
    equals?: number;
}

export interface ValueRule {
    column: string; // column to check
    equals?: any;
    notEquals?: any;
    greaterThan?: number;
    lessThan?: number;
    between?: BetweenRule;
    inSet?: any[];
    notNull?: boolean;
    regex?: string | RegExp;
    length?: LengthRule;
}

export type AggregateFn = "COUNT" | "SUM" | "AVG" | "MIN" | "MAX";

export interface AggregateRule {
    fn: AggregateFn;
    column?: string; // optional for COUNT
    equals?: number;
    min?: number;
    max?: number;
    tolerance?: number; // for AVG comparisons
}

export interface CustomRule {
    message: string;
    rule: string; // boolean expression evaluated per row
}

export interface ValidationSchema {
    strict?: boolean; // if true, performs very strict comparison (case, order, etc.)
    expectedResult?: Array<Record<string, unknown>>; // for direct result comparison
    columns?: ColumnSchema;
    rows?: RowsSchema;
    values?: ValueRule[];
    aggregates?: AggregateRule[];
    custom?: CustomRule[];
}

export interface ValidationSuccess {
    success: true;
}

export interface ValidationFailure {
    success: false;
    error: {
        type: string;
        message: string;
        details?: any;
    };
}

export type ValidationResult = ValidationSuccess | ValidationFailure;

export type ExecutableRule = (
    rows: Array<Record<string, unknown>>
) => ValidationResult;
