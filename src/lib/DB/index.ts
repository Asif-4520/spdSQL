export {
    initDuckDB,
    getDB,
    getConnection,
    isInitialized,
    ensureInitialized,
    loadExtension,
    type QueryResult,
    type QueryResponse,
    type ColumnInfo,
    type SchemaRow,
} from './db.core';

export {
    runSQL,
    executeSQL,
    resetDB,
    getSchema,
    getTables,
    explainSQL,
    getTableColumns,
    tableExists,
    isRowReturningStatement,
    isDMLStatement,
    isDDLStatement,
    type StatementType,
    type StructuredQueryResult,
} from './db.query';

export { importFile, importZipFile } from './db.import';

export {
    exportDatabaseAsSQL,
    saveDatabase,
    exportTableAsCSV,
    exportTableAsJSON,
    exportTableAsParquet,
    exportTableAsExcel,
    exportAllTablesAsParquet,
} from './db.export';
export { createDemoData, createDemoIndianUsers } from './db.demo';
