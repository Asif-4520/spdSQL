import { useStateContext } from "../context/GlobalContext";
import { useNavigate } from "react-router";
import { RELATIVE } from "../routes/paths";
import {
    History as HistoryIcon,
    Trash2,
    Play,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";

export default function History() {
    const { History, clearHistory, setQuery } = useStateContext();
    const navigate = useNavigate();

    const handleLoadQuery = (query: string) => {
        setQuery(query);
        navigate(RELATIVE.EDITOR);
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60000) {
            return "Just now";
        }
        if (diff < 3600000) {
            return `${Math.floor(diff / 60000)} min ago`;
        }
        if (diff < 86400000) {
            return `${Math.floor(diff / 3600000)} hours ago`;
        }
        return date.toLocaleDateString();
    };

    return (
        <div className="p-6 h-full w-full overflow-auto bg-(--bg-panel) text-(--text-primary)">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <HistoryIcon size={24} className="text-(--accent-color)" />
                    <h1 className="text-xl font-bold">Query History</h1>
                    {History.length > 0 && (
                        <span className="text-sm text-(--text-secondary) bg-(--bg-activity-bar) px-3 py-1 rounded-full">
                            {History.length} queries
                        </span>
                    )}
                </div>
                {History.length > 0 && (
                    <button
                        onClick={() => clearHistory()}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 border border-red-500/30 rounded-xl text-sm transition-colors"
                    >
                        <Trash2 size={14} />
                        Clear All
                    </button>
                )}
            </div>

            {History.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-(--text-secondary)">
                    <div className="w-20 h-20 rounded-2xl bg-(--bg-activity-bar) flex items-center justify-center mb-4">
                        <Clock size={36} className="opacity-40" />
                    </div>
                    <p className="text-lg font-medium">No queries yet</p>
                    <p className="text-sm opacity-70">
                        Run a query to see it here
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {History.map((item, idx) => (
                        <div
                            key={idx}
                            className="group p-4 bg-(--bg-main) border border-(--border-color) rounded-xl hover:border-(--accent-color)/50 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <pre className="text-sm font-mono whitespace-pre-wrap wrap-break-word bg-(--bg-panel) p-3 rounded-xl border border-(--border-color) max-h-32 overflow-auto">
                                        {item.query}
                                    </pre>
                                </div>
                                <button
                                    onClick={() => handleLoadQuery(item.query)}
                                    className="flex items-center gap-2 px-4 py-2 bg-(--accent-color) text-white rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                >
                                    <Play size={14} />
                                    Load
                                </button>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-xs">
                                <span
                                    className={`flex items-center gap-1.5 ${
                                        item.status === "success"
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {item.status === "success" ? (
                                        <CheckCircle size={14} />
                                    ) : (
                                        <XCircle size={14} />
                                    )}
                                    {item.status === "success"
                                        ? "Success"
                                        : "Error"}
                                </span>
                                <span className="text-(--text-secondary)">
                                    {formatTime(item.timestamp)}
                                </span>
                                <span className="text-(--text-secondary) opacity-60">
                                    {new Date(
                                        item.timestamp
                                    ).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
