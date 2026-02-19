import { useState } from "react";
import { Copy, Table2, FileJson } from "lucide-react";
import { convertToJson } from "./utils";
import { TableView } from "./TableView";
import { JsonView } from "./JsonView";

interface DataTableProps {
    columns: string[];
    values: unknown[][];
    fontSize: number;
}

export function DataTable({ columns, values, fontSize }: DataTableProps) {
    const [viewMode, setViewMode] = useState<"table" | "json">("table");

    const jsonData = convertToJson(columns, values);

    const copyAllData = () => {
        const text = JSON.stringify(jsonData, null, 2);
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="h-full flex flex-col bg-(--bg-main)">
            {/* View Mode Toolbar */}
            <div className="px-2 sm:px-3 py-2 bg-(--bg-panel) border-b border-(--border-color) flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={() => setViewMode("table")}
                        className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 sm:gap-1.5 ${
                            viewMode === "table"
                                ? "bg-(--accent-color) text-white shadow-md"
                                : "bg-(--bg-activity-bar) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-list-hover)"
                        }`}
                        title="Table View"
                    >
                        <Table2 size={14} />
                        <span className="hidden xs:inline">Table</span>
                    </button>
                    <button
                        onClick={() => setViewMode("json")}
                        className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 sm:gap-1.5 ${
                            viewMode === "json"
                                ? "bg-(--accent-color) text-white shadow-md"
                                : "bg-(--bg-activity-bar) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-list-hover)"
                        }`}
                        title="JSON View"
                    >
                        <FileJson size={14} />
                        <span className="hidden xs:inline">JSON</span>
                    </button>
                </div>
                <button
                    onClick={copyAllData}
                    className="px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-(--bg-activity-bar) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-list-hover) transition-all flex items-center gap-1 sm:gap-1.5 shrink-0"
                    title="Copy All Data as JSON"
                >
                    <Copy size={14} />
                    <span className="hidden xs:inline">Copy</span>
                </button>
            </div>
            {viewMode === "table" ? (
                <TableView
                    columns={columns}
                    values={values}
                    fontSize={fontSize}
                />
            ) : (
                <JsonView data={jsonData} fontSize={fontSize} />
            )}
        </div>
    );
}
