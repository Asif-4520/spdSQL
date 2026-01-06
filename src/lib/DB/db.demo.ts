import { runSQL } from './db.query';
import {
    DEMO_TABLES,
    getTablesWithDependencies,
    getTableData,
    type TableInfo,
} from '../data';
import type { DemoTableData } from '../data/demo-data';

const generateCreateTableSQL = (
    tableName: string,
    schema: DemoTableData['schema']
): string => {
    const columns = schema.columns
        .map((col) => `${col.name} ${col.type}`)
        .join(',\n    ');
    return `CREATE TABLE IF NOT EXISTS ${tableName} (\n    ${columns}\n);`;
};

const generateInsertSQL = (
    tableName: string,
    data: Record<string, any>[]
): string => {
    if (data.length === 0) return '';

    const columns = Object.keys(data[0]);
    const values = data.map((row) => {
        const rowValues = columns.map((col) => {
            const val = row[col];
            if (val === null || val === undefined) return 'NULL';
            if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
            if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
            return val;
        });
        return `(${rowValues.join(', ')})`;
    });

    return `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES\n${values.join(',\n')};`;
};

export const loadTableFromJSON = async (tableId: string): Promise<void> => {
    const tableData = await getTableData(tableId);
    if (!tableData) {
        throw new Error(`Unknown table: ${tableId}`);
    }

    const createSQL = generateCreateTableSQL(tableId, tableData.schema);
    await runSQL(createSQL);

    const insertSQL = generateInsertSQL(tableId, tableData.data);
    if (insertSQL) {
        await runSQL(insertSQL);
    }
};

export const importTables = async (
    tableIds: string[]
): Promise<{ success: string[]; failed: string[] }> => {
    const orderedTables = getTablesWithDependencies(tableIds);
    const success: string[] = [];
    const failed: string[] = [];

    for (const tableId of orderedTables) {
        try {
            await loadTableFromJSON(tableId);
            success.push(tableId);
        } catch (error) {
            console.error(`Failed to import table ${tableId}:`, error);
            failed.push(tableId);
        }
    }

    return { success, failed };
};

export const importTable = async (tableId: string): Promise<void> => {
    await loadTableFromJSON(tableId);
};

export const createDemoData = async (): Promise<void> => {
    const allTableIds = DEMO_TABLES.map((t) => t.id);
    await importTables(allTableIds);
};

export const getAvailableTables = (): TableInfo[] => {
    return DEMO_TABLES;
};

export const createDemoIndianUsers = createDemoData;

export {
    DEMO_TABLES,
    TABLE_CATEGORIES,
    TABLE_PRESETS,
    getTablesWithDependencies,
    getTableInfo,
    getTablesByCategory,
} from '../data';
export type { TableInfo } from '../data';
