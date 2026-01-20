import React from "react";

export function SettingCard({
    title,
    icon: Icon,
    children,
    badge,
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    badge?: string;
}) {
    return (
        <div className="relative rounded-2xl border border-(--border-color)/70 bg-(--bg-panel)/70 backdrop-blur-xl shadow-lg shadow-black/5 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--accent-color)/60 to-transparent" />
            <div className="flex items-center gap-3 px-4 py-3 border-b border-(--border-color)/70 bg-(--bg-main)/60">
                <div className="w-9 h-9 rounded-xl bg-(--accent-color)/12 text-(--accent-color) flex items-center justify-center shadow-inner">
                    <Icon size={16} />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-(--text-primary)">
                        {title}
                    </p>
                    {badge ? (
                        <span className="inline-flex text-[10px] font-bold uppercase tracking-[0.18em] text-(--text-secondary)">
                            {badge}
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="p-4 sm:p-5 space-y-4">{children}</div>
        </div>
    );
}
