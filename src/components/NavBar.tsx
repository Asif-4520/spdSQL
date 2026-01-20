import { Play, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";

import { useStateContext } from "../context/GlobalContext";
import { useSettingsStore } from "../store";
import { RELATIVE } from "../routes/paths";
import { saveDatabase } from "../lib/db";
import { useQueryRunner } from "../hooks/useQueryRunner";

type MenuKey = "file" | "view" | "help" | null;

const MenuButton = ({
    menu,
    label,
    openMenu,
    toggleMenu,
}: {
    menu: Exclude<MenuKey, null>;
    label: string;
    openMenu: MenuKey;
    toggleMenu: (menu: MenuKey) => void;
}) => (
    <button
        onClick={() => toggleMenu(menu)}
        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
            openMenu === menu
                ? "bg-(--accent-color)/20 text-(--accent-color)"
                : "text-(--text-primary) hover:bg-(--bg-activity-bar)"
        }`}
    >
        {label}
    </button>
);

const MenuItem = ({
    onClick,
    label,
    shortcut,
    disabled,
    closeMenus,
}: {
    onClick: () => void;
    label: string;
    shortcut?: string;
    disabled?: boolean;
    closeMenus: () => void;
}) => (
    <button
        disabled={disabled}
        onClick={() => {
            if (!disabled) {
                onClick();
                closeMenus();
            }
        }}
        className={`w-full px-4 py-2.5 flex justify-between items-center text-sm transition-colors ${
            disabled
                ? "opacity-50 cursor-not-allowed text-(--text-secondary)"
                : "hover:bg-(--accent-color) hover:text-white text-(--text-primary)"
        }`}
    >
        <span>{label}</span>
        {shortcut && (
            <span className="text-xs font-mono opacity-50">{shortcut}</span>
        )}
    </button>
);

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    const { QueryResult, ExecStatus } = useStateContext();
    const { runQuery } = useQueryRunner();

    const { isVertical, setIsVertical } = useSettingsStore();

    const [openMenu, setOpenMenu] = useState<MenuKey>(null);

    const isRunning = ExecStatus === "running";

    const toggleMenu = useCallback((menu: MenuKey) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    }, []);

    const closeMenus = useCallback(() => {
        setOpenMenu(null);
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                closeMenus();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [closeMenus]);

    const onRun = async () => {
        if (isRunning) {
            return;
        }
        await runQuery();
    };

    const handleSaveDatabase = async () => {
        const id = toast.loading("Exporting database...");
        try {
            await saveDatabase();
            toast.success("Database exported", { id });
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Export failed";
            toast.error(errorMessage, { id });
        }
    };

    const handleExportCSV = async () => {
        if (!QueryResult?.length) {
            toast.error("No results to export");
            return;
        }

        const { columns, values } = QueryResult[0];
        if (!columns?.length) {
            toast.error("No data to export");
            return;
        }

        const id = toast.loading("Exporting CSV...");
        try {
            const esc = (v: unknown) => {
                if (v == null) {
                    return "";
                }
                const s = String(v);
                return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
            };

            const csv = [
                columns.join(","),
                ...values.map((r: unknown[]) => r.map(esc).join(",")),
            ].join("\n");

            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `query_result_${Date.now()}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            toast.success("CSV exported", { id });
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Export failed";
            toast.error(errorMessage, { id });
        }
    };

    const currentPath = location.pathname.replace("/app", "").replace("/", "");
    const isEditorPage = currentPath === "" || currentPath === "editor";

    return (
        <div
            ref={menuRef}
            className="h-12 px-3 bg-(--bg-title-bar) border-b border-(--border-color) flex justify-between items-center select-none"
        >
            <div className="flex items-center gap-1">
                <img
                    src="/assets/light/android-chrome-192x192.png"
                    className="w-8 h-8 rounded-full"
                />

                <div className="relative">
                    <MenuButton
                        menu="file"
                        label="File"
                        openMenu={openMenu}
                        toggleMenu={toggleMenu}
                    />
                    {openMenu === "file" && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-(--bg-panel) border border-(--border-color) rounded-xl shadow-2xl z-50 py-1">
                            <MenuItem
                                onClick={() => navigate(RELATIVE.IMPORT)}
                                label="Import Data"
                                shortcut="Ctrl+I"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.DEMO)}
                                label="Load Demo Data"
                                shortcut="Ctrl+Shift+D"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.EXPORT)}
                                label="Export Data"
                                shortcut="Ctrl+Shift+E"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={handleExportCSV}
                                label="Export Results as CSV"
                                disabled={!QueryResult?.length}
                                closeMenus={closeMenus}
                            />
                            <div className="h-px bg-(--border-color) my-1" />
                            <MenuItem
                                onClick={handleSaveDatabase}
                                label="Save Database"
                                shortcut="Ctrl+S"
                                closeMenus={closeMenus}
                            />
                        </div>
                    )}
                </div>

                <div className="relative">
                    <MenuButton
                        menu="view"
                        label="View"
                        openMenu={openMenu}
                        toggleMenu={toggleMenu}
                    />
                    {openMenu === "view" && (
                        <div className="absolute top-full left-0 mt-1 w-52 bg-(--bg-panel) border border-(--border-color) rounded-xl shadow-2xl z-50 py-1">
                            <MenuItem
                                onClick={() => setIsVertical(!isVertical)}
                                label="Toggle Split"
                                shortcut="Ctrl+\\"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.EDITOR)}
                                label="Editor"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.SCHEMA)}
                                label="Schema View"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.HISTORY)}
                                label="History"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.SETTINGS)}
                                label="Settings"
                                closeMenus={closeMenus}
                            />
                        </div>
                    )}
                </div>

                <div className="relative">
                    <MenuButton
                        menu="help"
                        label="Help"
                        openMenu={openMenu}
                        toggleMenu={toggleMenu}
                    />
                    {openMenu === "help" && (
                        <div className="absolute top-full left-0 mt-1 w-52 bg-(--bg-panel) border border-(--border-color) rounded-xl shadow-2xl z-50 py-1">
                            <MenuItem
                                onClick={() => navigate(RELATIVE.SHORTCUTS)}
                                label="Keyboard Shortcuts"
                                shortcut="Ctrl+K"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.HELP)}
                                label="Documentation"
                                closeMenus={closeMenus}
                            />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.FEEDBACK)}
                                label="Send Feedback"
                                closeMenus={closeMenus}
                            />
                            <div className="h-px bg-(--border-color) my-1" />
                            <MenuItem
                                onClick={() => navigate(RELATIVE.ABOUT)}
                                label="About spdSQL"
                                closeMenus={closeMenus}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    disabled={!isEditorPage || isRunning}
                    onClick={onRun}
                    className={`px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all ${
                        !isEditorPage || isRunning
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                    }`}
                >
                    {isRunning ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Play size={16} />
                    )}
                    <span>{isRunning ? "Running" : "Run"}</span>
                </button>
            </div>
        </div>
    );
}

export default NavBar;
