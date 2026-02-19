import { useMemo, useState, useRef } from "react";
import { formatValue } from "./utils";

interface TableViewProps {
    columns: string[];
    values: unknown[][];
    fontSize: number;
}

export function TableView({ columns, values, fontSize }: TableViewProps) {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    // Calculate optimal column widths based on content
    const columnWidths = useMemo(() => {
        if (!values.length || !columns.length) {
            return [];
        }

        return columns.map((col, colIndex) => {
            // Start with header width
            const headerWidth = Math.min(col.length * 8 + 40, 300);

            // Sample first 100 rows to determine max content width
            const sampleSize = Math.min(values.length, 100);
            const maxContentWidth = values
                .slice(0, sampleSize)
                .reduce((max, row) => {
                    const cellValue = formatValue(row[colIndex]);
                    const cellWidth = Math.min(cellValue.length * 7 + 24, 400);
                    return Math.max(max, cellWidth);
                }, 0);

            // Return the larger of header or content width, with min/max bounds
            return Math.max(
                120,
                Math.min(400, Math.max(headerWidth, maxContentWidth))
            );
        });
    }, [columns, values]);

    return (
        <div
            ref={tableContainerRef}
            className="flex-1 overflow-auto custom-scrollbar relative"
            style={{
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
            }}
        >
            <div className="inline-block min-w-full">
                <table
                    className="w-full border-collapse"
                    style={{
                        fontSize: `${Math.max(fontSize - 1, 11)}px`,
                        tableLayout: "fixed",
                        minWidth: "100%",
                    }}
                >
                    {/* Table Header */}
                    <thead className="bg-(--bg-activity-bar) sticky top-0 z-30 shadow-sm">
                        <tr>
                            {/* Row Number Column - Fixed */}
                            <th
                                className="px-2 py-2.5 text-xs text-(--text-secondary) border-b-2 border-(--border-color) font-medium sticky left-0 bg-(--bg-activity-bar) z-40 shadow-sm"
                                style={{
                                    width: "60px",
                                    minWidth: "60px",
                                    maxWidth: "60px",
                                }}
                            >
                                <div className="flex items-center justify-center">
                                    #
                                </div>
                            </th>

                            {/* Data Columns */}
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className="px-3 py-2.5 text-left text-xs font-semibold text-(--text-primary) border-b-2 border-(--border-color) bg-(--bg-activity-bar) select-none"
                                    style={{
                                        width: columnWidths[i] || "auto",
                                        minWidth: "120px",
                                        position: "relative",
                                    }}
                                >
                                    <div className="flex items-center gap-2 justify-between">
                                        <span
                                            className="truncate flex-1"
                                            title={col}
                                        >
                                            {col}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {values.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onMouseEnter={() => setHoveredRow(rowIndex)}
                                onMouseLeave={() => setHoveredRow(null)}
                                className={`
                                    ${
                                        rowIndex % 2
                                            ? "bg-(--bg-panel)"
                                            : "bg-(--bg-main)"
                                    }
                                    ${
                                        hoveredRow === rowIndex
                                            ? "bg-(--bg-list-hover) shadow-sm"
                                            : ""
                                    }
                                    transition-all duration-150 cursor-default
                                    border-b border-(--border-color)
                                `}
                            >
                                <td
                                    className={`
                                        px-2 py-2 text-xs text-(--text-secondary) border-b border-(--border-color) 
                                        font-mono sticky left-0 z-20 text-center
                                        ${
                                            hoveredRow === rowIndex
                                                ? "bg-(--bg-list-hover) font-semibold"
                                                : "bg-inherit"
                                        }
                                    `}
                                    style={{
                                        width: "60px",
                                        minWidth: "60px",
                                        maxWidth: "60px",
                                    }}
                                >
                                    {rowIndex + 1}
                                </td>

                                {/* Data Cells */}
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="px-3 py-2 border-b border-(--border-color) group"
                                        style={{
                                            width:
                                                columnWidths[cellIndex] ||
                                                "auto",
                                            minWidth: "120px",
                                            maxHeight: "200px",
                                            overflow: "hidden",
                                        }}
                                        title={formatValue(cell)}
                                    >
                                        <div
                                            className={`
                                                text-xs leading-relaxed
                                                ${
                                                    cell === null
                                                        ? "text-(--text-secondary) italic"
                                                        : "text-(--text-primary)"
                                                }
                                                ${
                                                    hoveredRow === rowIndex
                                                        ? "font-medium"
                                                        : ""
                                                }
                                            `}
                                            style={{
                                                wordBreak: "break-word",
                                                overflowWrap: "anywhere",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {formatValue(cell)}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Scroll Indicators */}
            {values.length > 20 && (
                <div className="sticky bottom-0 left-0 right-0 h-1 bg-linear-to-t from-(--bg-panel) to-transparent pointer-events-none z-10" />
            )}
        </div>
    );
}
