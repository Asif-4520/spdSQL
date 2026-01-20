import React from "react";

interface Props {
    status: "ready" | "running" | "loading" | "error";
    message?: string;
}
const Statusbar: React.FC<Props> = ({ status, message }) => {
    const statusDot = {
        ready: "bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.5)]",
        running: "bg-blue-400 animate-pulse",
        loading: "bg-yellow-400 animate-pulse",
        error: "bg-red-500",
    }[status];

    return (
        <div className="h-6 w-full bg-(--bg-status-bar) text-white text-[10px] sm:text-xs flex items-center  sm:px-2 select-none justify-between border-t border-(--border-color) overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 overflow-hidden mr-2 sm:mr-4">
                <span className="flex items-center gap-1 sm:gap-2 font-medium shrink-0">
                    <span
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusDot}`}
                    ></span>
                    <span className="tracking-wide hidden xs:inline">
                        {status.toUpperCase()}
                    </span>
                </span>

                <div className="h-3 w-px bg-white/20 mx-0.5 sm:mx-1 shrink-0 hidden xs:block"></div>

                {message && (
                    <button className="truncate max-w-37.5 sm:max-w-125 hover:bg-white/10 px-1 sm:px-1.5 py-0.5 rounded transition-colors text-left flex items-center gap-2 group">
                        {message}
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <div className="h-3 w-px bg-white/20 mx-0.5 sm:mx-1 hidden xs:block"></div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <span
                        className="cursor-pointer hover:bg-white/10 pr-3 rounded"
                        title="Language mode"
                    >
                        spdSQL
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Statusbar;
