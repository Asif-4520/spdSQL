export const formatValueForSQL = (
    val: any,
    type: string | undefined
): string => {
    if (val === null || val === undefined) {
        return "NULL";
    }

    if (type === "DATE") {
        if (typeof val === "number") {
            const d = new Date(val);
            return `'${d.toISOString().split("T")[0]}'`;
        }
        return `'${val}'`;
    }

    if (type?.includes("TIMESTAMP")) {
        if (typeof val === "number") {
            const d = new Date(val);
            return `'${d.toISOString().replace("T", " ").replace("Z", "")}'`;
        }
        const strVal = String(val).replace(/[+-]\d{2}:\d{2}$/, "");
        return `'${strVal}'`;
    }

    if (type === "TIME") {
        return `'${val}'`;
    }

    if (typeof val === "string") {
        return `'${val.replace(/'/g, "''")}'`;
    }

    return String(val);
};

export const formatValueForCSV = (val: any): string => {
    if (val === null || val === undefined) {
        return "";
    }
    const str = String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
};
