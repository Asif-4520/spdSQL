import {
    importCSVFile,
    importJSONFile,
    importParquetFile,
    importSQLFile,
} from "./file-handler";
import { importExcelFile } from "./excel-handler";
import { importZipFile } from "./zip-handler";
import { importCSVText, importJSONText } from "./text-handler";

export { importTables } from "../demo";
export { importCSVText, importJSONText };

export const importFile = async (file: File): Promise<string> => {
    const fileName = file.name;

    if (fileName.endsWith(".sql")) {
        return importSQLFile(file);
    }

    if (fileName.endsWith(".csv")) {
        return importCSVFile(file);
    }

    if (fileName.endsWith(".json")) {
        return importJSONFile(file);
    }

    if (fileName.endsWith(".parquet")) {
        return importParquetFile(file);
    }

    if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
        return importExcelFile(file);
    }

    if (fileName.endsWith(".zip")) {
        return importZipFile(file);
    }

    throw new Error(
        "Unsupported file type. Supported: .csv, .json, .sql, .parquet, .xls, .xlsx, .zip"
    );
};

export { importParquetFile, importZipFile };
