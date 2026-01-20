export type StatementType =
    | "SELECT"
    | "INSERT"
    | "UPDATE"
    | "DELETE"
    | "CREATE"
    | "DROP"
    | "ALTER"
    | "TRUNCATE"
    | "BEGIN"
    | "COMMIT"
    | "ROLLBACK"
    | "SET"
    | "PRAGMA"
    | "EXPLAIN"
    | "DESCRIBE"
    | "SHOW"
    | "COPY"
    | "EXPORT"
    | "IMPORT"
    | "UNKNOWN"
    | "ERROR";

export const detectStatementType = (sql: string): StatementType => {
    const s = sql.trim().toUpperCase();
    if (s.startsWith("SELECT") || s.startsWith("WITH")) {
        return "SELECT";
    }
    if (s.startsWith("INSERT")) {
        return "INSERT";
    }
    if (s.startsWith("UPDATE")) {
        return "UPDATE";
    }
    if (s.startsWith("DELETE")) {
        return "DELETE";
    }
    if (s.startsWith("CREATE")) {
        return "CREATE";
    }
    if (s.startsWith("DROP")) {
        return "DROP";
    }
    if (s.startsWith("ALTER")) {
        return "ALTER";
    }
    if (s.startsWith("TRUNCATE")) {
        return "TRUNCATE";
    }
    if (s.startsWith("BEGIN")) {
        return "BEGIN";
    }
    if (s.startsWith("COMMIT")) {
        return "COMMIT";
    }
    if (s.startsWith("ROLLBACK")) {
        return "ROLLBACK";
    }
    if (s.startsWith("SET")) {
        return "SET";
    }
    if (s.startsWith("PRAGMA")) {
        return "PRAGMA";
    }
    if (s.startsWith("EXPLAIN")) {
        return "EXPLAIN";
    }
    if (s.startsWith("DESCRIBE") || s.startsWith("DESC")) {
        return "DESCRIBE";
    }
    if (s.startsWith("SHOW")) {
        return "SHOW";
    }
    if (s.startsWith("COPY")) {
        return "COPY";
    }
    if (s.startsWith("EXPORT")) {
        return "EXPORT";
    }
    if (s.startsWith("IMPORT")) {
        return "IMPORT";
    }
    return "UNKNOWN";
};

export const isRowReturningStatement = (type: StatementType) =>
    ["SELECT", "SHOW", "DESCRIBE", "EXPLAIN", "PRAGMA"].includes(type);

export const isDMLStatement = (type: StatementType) =>
    ["INSERT", "UPDATE", "DELETE"].includes(type);

export const isDDLStatement = (type: StatementType) =>
    ["CREATE", "DROP", "ALTER", "TRUNCATE"].includes(type);
