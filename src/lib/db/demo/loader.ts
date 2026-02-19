import { runSQL } from "../query";
import {
    DEMO_TABLES,
    getTablesWithDependencies,
    fetchTableCSV,
    getTableSchema,
    type TableInfo,
} from "../data";

const generateCreateTableSQL = (
    tableName: string,
    columns: { name: string; type: string }[]
): string => {
    const columnDefs = columns
        .map((col) => `${col.name} ${col.type}`)
        .join(",\n    ");
    return `CREATE TABLE IF NOT EXISTS ${tableName} (\n    ${columnDefs}\n);`;
};

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
            result.push(current.trim());
            current = "";
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

export const loadTable = async (tableId: string): Promise<void> => {
    const schema = getTableSchema(tableId);
    if (!schema) {
        throw new Error(`Unknown table: ${tableId}`);
    }

    const csvData = await fetchTableCSV(tableId);

    const createSQL = generateCreateTableSQL(tableId, schema.columns);
    await runSQL(createSQL);

    const lines = csvData.trim().split("\n");
    if (lines.length <= 1) {
        return;
    }

    const headers = parseCSVLine(lines[0]);
    const values = lines.slice(1).map((line) => {
        const vals = parseCSVLine(line).map((v) => {
            if (!v || v === "" || v.toUpperCase() === "NULL") {
                return "NULL";
            }
            if (v.toLowerCase() === "true") {
                return "TRUE";
            }
            if (v.toLowerCase() === "false") {
                return "FALSE";
            }
            if (!isNaN(Number(v)) && v.trim() !== "") {
                return v;
            }
            return `'${v.replace(/'/g, "''")}'`;
        });
        return `(${vals.join(", ")})`;
    });

    const insertSQL = `INSERT INTO ${tableId} (${headers.join(
        ", "
    )}) VALUES\n${values.join(",\n")};`;
    await runSQL(insertSQL);
};

export const importTables = async (
    tableIds: string[]
): Promise<{ success: string[]; failed: string[] }> => {
    const orderedTables = getTablesWithDependencies(tableIds);
    const success: string[] = [];
    const failed: string[] = [];

    for (const tableId of orderedTables) {
        try {
            await loadTable(tableId);
            success.push(tableId);
        } catch (error) {
            console.error(`Failed to import table ${tableId}:`, error);
            failed.push(tableId);
        }
    }

    return { success, failed };
};

export const importTable = async (tableId: string): Promise<void> => {
    await loadTable(tableId);
};

export const createDemoData = async (): Promise<void> => {
    const allTableIds = DEMO_TABLES.map((t: TableInfo) => t.id);
    await importTables(allTableIds);
};

export const getAvailableTables = (): TableInfo[] => {
    return DEMO_TABLES;
};
