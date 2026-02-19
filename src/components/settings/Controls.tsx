import React from "react";
import { Check } from "lucide-react";
import type { PaletteOption } from "./options";

export function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: () => void;
    label: string;
}) {
    return (
        <button
            onClick={onChange}
            className="flex items-center justify-between w-full rounded-xl border px-4 py-3 text-left transition"
            style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-main)",
            }}
        >
            <span
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
            >
                {label}
            </span>
            <span
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
                style={{
                    backgroundColor: checked
                        ? "var(--accent-color)"
                        : "rgba(156, 163, 175, 0.4)",
                }}
            >
                <span
                    className={`h-5 w-5 rounded-full bg-white shadow transform transition-all duration-200 ${
                        checked ? "translate-x-5" : "translate-x-1"
                    }`}
                />
            </span>
        </button>
    );
}

export function Slider({
    value,
    onChange,
    min,
    max,
    label,
    unit,
}: {
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    label: string;
    unit: string;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                >
                    {label}
                </span>
                <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                    style={{
                        color: "var(--accent-color)",
                        backgroundColor: "rgba(123, 129, 234, 0.1)",
                    }}
                >
                    {value}
                    {unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                className="w-full"
                style={{ accentColor: "var(--accent-color)" }}
            />
        </div>
    );
}

export function Pill({
    active,
    label,
    onClick,
    icon: Icon,
}: {
    active: boolean;
    label: string;
    onClick: () => void;
    icon: React.ElementType;
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all"
            style={{
                borderColor: active
                    ? "var(--accent-color)"
                    : "rgba(50, 53, 62, 0.8)",
                backgroundColor: active
                    ? "rgba(123, 129, 234, 0.1)"
                    : "rgba(24, 25, 28, 0.6)",
                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: active
                    ? "0 10px 40px -20px var(--accent-color)"
                    : "none",
            }}
        >
            <Icon size={16} />
            {label}
        </button>
    );
}

export function PalettePill({
    option,
    selected,
    onClick,
}: {
    option: PaletteOption;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors"
            style={{
                borderColor: selected
                    ? "var(--accent-color)"
                    : "rgba(50, 53, 62, 0.7)",
                backgroundColor: selected
                    ? "rgba(32, 34, 39, 0.8)"
                    : "rgba(24, 25, 28, 0.7)",
            }}
        >
            <div className="flex-1 space-y-1">
                <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                >
                    {option.label}
                </p>
                {option.hint ? (
                    <p
                        className="text-xs"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {option.hint}
                    </p>
                ) : null}
                <div className="flex gap-1.5">
                    {option.colors.map((color: string) => (
                        <span
                            key={color}
                            className="h-2 flex-1 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
            <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border transition"
                style={{
                    borderColor: selected
                        ? "var(--accent-color)"
                        : "rgba(50, 53, 62, 0.8)",
                    backgroundColor: selected
                        ? "var(--accent-color)"
                        : "transparent",
                    color: selected ? "white" : "var(--text-secondary)",
                }}
            >
                {selected ? <Check size={14} /> : null}
            </span>
        </button>
    );
}
