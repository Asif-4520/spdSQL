import { Link } from "react-router";
import { Database, ArrowRight, Github, Play } from "lucide-react";
import { PATHS } from "../routes/paths";

export default function Home() {
    return (
        <div className="h-screen overflow-y-scroll overflow-x-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />

            <nav className="relative z-10 border-b border-slate-800/50 backdrop-blur-md bg-slate-950/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-3">
                            <img
                                src="/assets/light/android-chrome-512x512.png"
                                alt="spdSQL Logo"
                                className="w-7 h-7 rounded-full"
                            />
                            <span className="text-xl font-bold bg-linear-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent ">
                                spdSQL
                            </span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com/Asif-4520"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-slate-200 transition-colors p-2"
                                aria-label="View source on GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <Link
                                to={PATHS.APP}
                                className="bg-linear-to-r from-emerald-500 to-cyan-500 text-slate-950 px-5 py-2.5 rounded-lg font-semibold hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
                            >
                                <Play className="w-4 h-4" fill="currentColor" />
                                <span>Launch App</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
                    <div className="text-center space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-slate-800/30 border border-slate-700/50 rounded-full px-4 py-2 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-sm text-slate-300">
                                Browser-based SQL environment
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                            <span className="block text-slate-100">
                                Practice SQL
                            </span>
                            <span className="block bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Without Any Setup
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed">
                            Import your data, write queries, and see results
                            instantly. Everything runs locally in your browser
                            with zero configuration.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                to={PATHS.APP}
                                className="w-full sm:w-auto bg-linear-to-r from-emerald-500 to-cyan-500 text-slate-950 px-8 py-4 rounded-lg font-bold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center space-x-3"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 pt-6">
                            <div className="flex items-center space-x-2">
                                <svg
                                    className="w-5 h-5 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>No installation required</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg
                                    className="w-5 h-5 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Supports CSV, JSON, Excel</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg
                                    className="w-5 h-5 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Complete Free</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                        <div className="bg-slate-900/80 border-b border-slate-800/50 px-4 py-3 flex items-center space-x-2">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                            </div>
                            <div className="flex-1 text-center text-sm text-slate-500 font-mono">
                                query.sql
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="bg-slate-950/50 border border-slate-800/50 rounded-lg p-4 font-mono text-sm">
                                <div className="text-slate-400 mb-3">
                                    <span className="text-emerald-400">
                                        SELECT
                                    </span>{" "}
                                    name, email, score
                                </div>
                                <div className="text-slate-400 mb-3">
                                    <span className="text-emerald-400">
                                        FROM
                                    </span>{" "}
                                    students
                                </div>
                                <div className="text-slate-400">
                                    <span className="text-emerald-400">
                                        WHERE
                                    </span>{" "}
                                    score {">"}= 90
                                </div>
                            </div>

                            <div className="bg-slate-950/50 border border-slate-800/50 rounded-lg overflow-hidden">
                                <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800/50 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                                        Results
                                    </span>
                                    <span className="text-xs text-emerald-400">
                                        3 rows
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-900/30">
                                            <tr className="border-b border-slate-800/50">
                                                <th className="text-left px-4 py-3 font-medium text-slate-400">
                                                    name
                                                </th>
                                                <th className="text-left px-4 py-3 font-medium text-slate-400">
                                                    email
                                                </th>
                                                <th className="text-left px-4 py-3 font-medium text-slate-400">
                                                    score
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="font-mono text-xs">
                                            <tr className="border-b border-slate-800/30 hover:bg-slate-800/20">
                                                <td className="px-4 py-3 text-slate-300">
                                                    Emma Wilson
                                                </td>
                                                <td className="px-4 py-3 text-cyan-400">
                                                    emma@email.com
                                                </td>
                                                <td className="px-4 py-3 text-emerald-400 font-semibold">
                                                    95
                                                </td>
                                            </tr>
                                            <tr className="border-b border-slate-800/30 hover:bg-slate-800/20">
                                                <td className="px-4 py-3 text-slate-300">
                                                    James Chen
                                                </td>
                                                <td className="px-4 py-3 text-cyan-400">
                                                    james@email.com
                                                </td>
                                                <td className="px-4 py-3 text-emerald-400 font-semibold">
                                                    92
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-slate-800/20">
                                                <td className="px-4 py-3 text-slate-300">
                                                    Sarah Davis
                                                </td>
                                                <td className="px-4 py-3 text-cyan-400">
                                                    sarah@email.com
                                                </td>
                                                <td className="px-4 py-3 text-emerald-400 font-semibold">
                                                    98
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
                            Why Choose spdSQL
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            A powerful SQL playground designed for learners and
                            professionals
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={<GlobeIcon />}
                            title="Browser Native"
                            description="Works entirely in your browser. No servers, no backend, no database installations needed."
                        />
                        <FeatureCard
                            icon={<ShieldIcon />}
                            title="Secure & Private"
                            description="Your data stays on your device. All processing happens locally for complete privacy."
                        />
                        <FeatureCard
                            icon={<ZapIcon />}
                            title="Lightning Fast"
                            description="Powered by DuckDB WASM for blazing fast query execution on large datasets."
                        />
                        <FeatureCard
                            icon={<CodeIcon />}
                            title="Real SQL"
                            description="Write actual SQL queries with full syntax support, not simplified versions."
                        />
                    </div>
                </section>

                <footer className="border-t border-slate-800/50 mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <Database
                                        className="w-5 h-5 text-slate-950"
                                        strokeWidth={2.5}
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-200">
                                        spdSQL
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        SQL Practice Environment
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm text-slate-500">
                                Built for developers, students, and data
                                analysts
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

function GlobeIcon() {
    return (
        <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
        </svg>
    );
}

function ZapIcon() {
    return (
        <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
            />
        </svg>
    );
}

function CodeIcon() {
    return (
        <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
        </svg>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-6 hover:border-slate-700/50 transition-all hover:bg-slate-900/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-500/10 to-cyan-500/10 rounded-lg flex items-center justify-center text-emerald-400 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">
                {title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
}
