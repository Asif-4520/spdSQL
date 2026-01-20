export interface QueryResult {
    columns: string[];
    values: unknown[][];
    columnTypes?: string[];
    statementType?: string;
    rowCount?: number;
    affectedRows?: number;
}

export interface QueryResponse {
    data: QueryResult[] | null;
    error: string | null;
    timeMs: number;
}

export interface ColumnInfo {
    column_name: string;
    data_type: string;
}

export interface SchemaRow {
    table_name: string;
    column_name: string;
    data_type: string;
}
