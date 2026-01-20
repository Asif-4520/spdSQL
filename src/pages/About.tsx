import {
    Database,
    Heart,
    Zap,
    Shield,
    FileSpreadsheet,
    Clock,
    Sparkles,
    Code,
    ArrowLeft,
    ExternalLink,
    Mail,
    Github,
} from "lucide-react";
import { useNavigate } from "react-router";

const APP_VERSION = "1.0.0";
const BUILD_DATE = "2026-01-17";

export default function About() {
    const navigate = useNavigate();

    const features = [
        {
            icon: Shield,
            title: "Privacy First",
            desc: "Everything runs locally. Your data never leaves your device.",
            color: "text-green-400",
            bg: "bg-green-500/10",
        },
        {
            icon: Zap,
            title: "Fast Performance",
            desc: "Get results in milliseconds, even on large files.",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
        },
        {
            icon: FileSpreadsheet,
            title: "Multiple Formats",
            desc: "Import CSV, JSON, SQL; export in your preferred format.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            icon: Clock,
            title: "Query History",
            desc: "All queries are saved automatically.",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            icon: Sparkles,
            title: "Smart Editor",
            desc: "Autocomplete and syntax highlighting.",
            color: "text-pink-400",
            bg: "bg-pink-500/10",
        },
        {
            icon: Code,
            title: "No Setup",
            desc: "Open and start querying immediately.",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
        },
    ];

    const useCases = [
        "Exploring CSV/JSON data without Excel",
        "Learning and practicing SQL",
        "Quick data analysis tasks",
        "Cleaning and transforming datasets",
        "Prototyping queries before production",
    ];

    return (
        <div className="h-full overflow-auto bg-(--bg-panel) text-(--text-primary)">
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl hover:bg-(--bg-activity-bar) transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-bold">About spdSQL</h1>
                </div>

                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-6 bg-(--accent-color)/20 rounded-3xl">
                        <Database size={48} className="text-(--accent-color)" />
                    </div>
                    <h2 className="text-3xl font-bold">spdSQL</h2>
                    <p className="text-(--text-secondary)">
                        Run SQL queries directly in your browser. No signup. No
                        servers.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-(--text-secondary) bg-(--bg-activity-bar) px-4 py-2 rounded-full">
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                        Version 1.0.0
                    </span>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div
                                    className={`p-3 rounded-xl ${f.bg} ${f.color}`}
                                >
                                    <f.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{f.title}</h4>
                                    <p className="text-sm text-(--text-secondary)">
                                        {f.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Perfect For</h3>
                    <ul className="space-y-2 text-(--text-secondary)">
                        {useCases.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-(--accent-color) rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-(--text-secondary) space-y-2">
                    <p>Built with DuckDB in the browser using WebAssembly.</p>
                    <div className="flex items-center gap-1">
                        <span>Made with</span>
                        <Heart size={14} className="text-red-500" />
                        <span>by</span>
                        <span className="font-semibold">Asif</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <a
                        href="https://github.com/Asif-4520"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-(--accent-color) text-white rounded-xl hover:opacity-90 transition-opacity"
                    >
                        <Github size={18} />
                        GitHub
                        <ExternalLink size={14} />
                    </a>
                    <a
                        href="mailto:asif.emailservice@gmail.com"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-(--bg-activity-bar) border border-(--border-color) rounded-xl hover:border-(--accent-color) transition-colors"
                    >
                        <Mail size={18} />
                        Contact
                    </a>
                </div>

                <div className="text-center mt-8 text-sm text-(--text-muted)">
                    <div className="flex items-center justify-center gap-2">
                        <Code size={14} />
                        <span>Version {APP_VERSION}</span>
                        <span>•</span>
                        <span>Built on {BUILD_DATE}</span>
                    </div>
                    <div className="mt-2 text-xs">
                        Powered by DuckDB WASM • React • TypeScript
                    </div>
                </div>
            </div>
        </div>
    );
}
