import { ensureInitialized, duckdb, loadExtension } from './db.core';
import JSZip from 'jszip';

const getTableNameFromFile = (fileName: string): string => {
    return fileName.split('.')[0].replace(/[^a-zA-Z0-9_]/g, '_');
};

export const importFile = async (file: File): Promise<string> => {
    const { db, con } = await ensureInitialized();
    const fileName = file.name;
    const tableName = getTableNameFromFile(fileName);

    if (fileName.endsWith('.sql')) {
        const text = await file.text();
        await con.query(text);
        return 'SQL executed successfully';
    }

    if (fileName.endsWith('.csv')) {
        await db.registerFileHandle(
            fileName,
            file,
            duckdb.DuckDBDataProtocol.BROWSER_FILEREADER,
            true
        );
        await con.query(
            `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_csv_auto('${fileName}')`
        );
        return `Table "${tableName}" created from CSV`;
    }

    if (fileName.endsWith('.json')) {
        await loadExtension('json');
        await db.registerFileHandle(
            fileName,
            file,
            duckdb.DuckDBDataProtocol.BROWSER_FILEREADER,
            true
        );
        await con.query(
            `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_json_auto('${fileName}')`
        );
        return `Table "${tableName}" created from JSON`;
    }

    if (fileName.endsWith('.parquet')) {
        await loadExtension('parquet');
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await db.registerFileBuffer(fileName, uint8Array);
        await con.query(
            `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_parquet('${fileName}')`
        );
        return `Table "${tableName}" created from Parquet file`;
    }

    if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
        const text = await file.text();
        const lines = text
            .replace(/^\uFEFF/, '')
            .split('\n')
            .filter((l) => l.trim());
        if (lines.length === 0) {
            throw new Error('Excel file is empty');
        }

        const csvContent = lines
            .map((line) => {
                const cells = line.split('\t');
                return cells
                    .map((cell) => {
                        const val = cell.trim();
                        if (
                            val.includes(',') ||
                            val.includes('"') ||
                            val.includes('\n')
                        ) {
                            return `"${val.replace(/"/g, '""')}"`;
                        }
                        return val;
                    })
                    .join(',');
            })
            .join('\n');

        const csvFileName = `${tableName}.csv`;
        const encoder = new TextEncoder();
        await db.registerFileBuffer(csvFileName, encoder.encode(csvContent));
        await con.query(
            `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_csv_auto('${csvFileName}')`
        );
        return `Table "${tableName}" created from Excel file`;
    }

    if (fileName.endsWith('.zip')) {
        return await importZipFile(file);
    }

    throw new Error(
        'Unsupported file type. Supported: .csv, .json, .sql, .parquet, .xls, .xlsx, .zip'
    );
};

export const importZipFile = async (file: File): Promise<string> => {
    const { db, con } = await ensureInitialized();

    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    const parquetFiles = Object.keys(zip.files).filter(
        (name) => name.endsWith('.parquet') && !zip.files[name].dir
    );

    if (parquetFiles.length === 0) {
        throw new Error('No Parquet files found in ZIP');
    }

    await loadExtension('parquet');

    let imported = 0;
    for (const fileName of parquetFiles) {
        const fileData = await zip.files[fileName].async('uint8array');
        const tableName = getTableNameFromFile(fileName);

        await db.registerFileBuffer(fileName, fileData);
        await con.query(
            `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_parquet('${fileName}')`
        );
        imported++;
    }

    return `Imported ${imported} table${imported !== 1 ? 's' : ''} from ZIP`;
};

export const importParquetFile = async (file: File): Promise<string> => {
    const { db, con } = await ensureInitialized();
    await loadExtension('parquet');
    const fileName = file.name;
    const tableName = getTableNameFromFile(fileName);

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    await db.registerFileBuffer(fileName, uint8Array);
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_parquet('${fileName}')`
    );

    return `Table "${tableName}" created from Parquet file`;
};

export const importCSVText = async (
    content: string,
    tableName: string
): Promise<string> => {
    const { db, con } = await ensureInitialized();
    const fileName = `${tableName}.csv`;

    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(content);

    await db.registerFileBuffer(fileName, uint8Array);
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_csv_auto('${fileName}')`
    );

    return `Table "${tableName}" created from CSV text`;
};

export const importJSONText = async (
    content: string,
    tableName: string
): Promise<string> => {
    const { db, con } = await ensureInitialized();
    await loadExtension('json'); // Lazy load JSON extension
    const fileName = `${tableName}.json`;
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(content);
    await db.registerFileBuffer(fileName, uint8Array);
    await con.query(
        `CREATE TABLE IF NOT EXISTS "${tableName}" AS SELECT * FROM read_json_auto('${fileName}')`
    );
    return `Table "${tableName}" created from JSON text`;
};
