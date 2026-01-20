import { useNavigate } from "react-router";
import { importFile } from "../lib/db";
import { PATHS, RELATIVE } from "../routes/paths";
import toast from "react-hot-toast";
import {
    Upload,
    ArrowLeft,
    FileSpreadsheet,
    FileJson,
    FileCode,
    FileArchive,
    Sheet,
    Sparkles,
} from "lucide-react";
import { useState, useRef } from "react";

function Import() {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file) {
            return;
        }

        setImporting(true);
        const toastId = toast.loading(`Importing ${file.name}...`);
        try {
            const msg = await importFile(file);
            toast.success(msg, { id: toastId });
            setTimeout(() => navigate(RELATIVE.BACK_TO_SCHEMA), 1000);
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Import failed", { id: toastId });
        } finally {
            setImporting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const formats = [
        {
            ext: ".sql",
            name: "SQL Script",
            icon: FileCode,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            ext: ".csv",
            name: "CSV",
            icon: FileSpreadsheet,
            color: "text-green-400",
            bg: "bg-green-500/10",
        },
        {
            ext: ".json",
            name: "JSON",
            icon: FileJson,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
        },
        {
            ext: ".parquet",
            name: "Parquet",
            icon: FileArchive,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            ext: ".xlsx",
            name: "Excel",
            icon: Sheet,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
        },
        {
            ext: ".zip",
            name: "Parquet ZIP",
            icon: FileArchive,
            color: "text-violet-400",
            bg: "bg-violet-500/10",
        },
    ];

    return (
        <div className="flex flex-col h-full p-6 overflow-auto">
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-xl hover:bg-(--bg-activity-bar) transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Upload size={22} className="text-(--accent-color)" />
                        Import Data
                    </h1>
                    <p className="text-sm text-(--text-secondary)">
                        Upload files to your database
                    </p>
                </div>
                <button
                    onClick={() => navigate(PATHS.DEMO)}
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                >
                    <Sparkles size={16} />
                    Demo Data
                </button>
            </div>

            <div className="max-w-lg mx-auto w-full space-y-6">
                <label
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                        isDragging
                            ? "border-(--accent-color) bg-(--accent-color)/10"
                            : "border-(--border-color) bg-(--bg-main) hover:border-(--accent-color)/50"
                    } ${importing ? "opacity-50 cursor-wait" : ""}`}
                >
                    {importing ? (
                        <div className="text-center">
                            <div className="w-10 h-10 border-3 border-(--accent-color) border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            <p className="font-medium">Importing...</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="w-14 h-14 rounded-2xl bg-(--bg-activity-bar) flex items-center justify-center mx-auto mb-3">
                                <Upload
                                    size={24}
                                    className="text-(--text-secondary)"
                                />
                            </div>
                            <p className="font-medium">
                                Click to upload or drag & drop
                            </p>
                            <p className="text-sm text-(--text-secondary) mt-1">
                                SQL, CSV, JSON, Parquet, Excel, ZIP, SQLite
                            </p>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".sql,.csv,.json,.db,.sqlite,.sqlite3,.parquet,.xls,.xlsx,.zip"
                        onChange={handleFileChange}
                        disabled={importing}
                    />
                </label>

                <section className="bg-(--bg-main) border border-(--border-color) rounded-2xl p-5">
                    <h2 className="font-semibold mb-4">Supported Formats</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {formats.map((fmt) => (
                            <div
                                key={fmt.ext}
                                className={`flex items-center gap-3 p-3 ${fmt.bg} rounded-xl`}
                            >
                                <fmt.icon size={18} className={fmt.color} />
                                <div className="flex-1">
                                    <span className="text-sm font-medium">
                                        {fmt.name}
                                    </span>
                                </div>
                                <span className="text-xs text-(--text-secondary) font-mono">
                                    {fmt.ext}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="text-center">
                    <button
                        onClick={() => navigate(PATHS.EXPORT)}
                        className="text-sm text-(--accent-color) hover:underline"
                    >
                        Go to Export →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Import;
