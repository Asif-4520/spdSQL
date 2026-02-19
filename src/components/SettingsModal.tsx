import { useSettingsStore } from "../store";
import {
    Columns,
    Palette,
    Rows,
    RotateCcw,
    Sparkles,
    Sun,
    Type,
} from "lucide-react";
import Modal from "./ui/Modal";
import { SettingCard } from "./settings/SettingCard";
import { Pill, Slider, Toggle, PalettePill } from "./settings/Controls";
import { paletteOptions, themeOptions } from "./settings/options";

export function SettingsContent() {
    const {
        themeMode,
        fontSize,
        showLineNumbers,
        autoSaveHistory,
        isVertical,
        setThemeMode,
        setEditorTheme,
        editorHighlight,
        setEditorHighlight,
        setFontSize,
        setShowLineNumbers,
        setAutoSaveHistory,
        setIsVertical,
        resetSettings,
    } = useSettingsStore();

    return (
        <div className="w-full flex flex-col gap-4 min-h-0 pr-2">
            <div className="relative overflow-hidden rounded-2xl border border-(--border-color)/70 bg-linear-to-r from-(--bg-main) via-(--bg-panel) to-(--bg-main) px-5 py-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_35%)]" />
                <div className="relative top-0 flex items-center h-full py-5 mt-2">
                    <div className="flex items-center gap-3 ">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--accent-color)/15 text-(--accent-color) shadow-inner">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <p className="text-lg font-black leading-tight text-(--text-primary)">
                                Control center
                            </p>
                            <p className="text-xs uppercase tracking-[0.18em] text-(--text-secondary) font-semibold">
                                Tune the editor, layout, and vibe
                            </p>
                        </div>
                    </div>
                    <div className="flex-1" />
                    <button
                        onClick={resetSettings}
                        className="inline-flex items-center gap-2 rounded-xl border border-(--border-color)/70 bg-(--bg-main)/60 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-(--text-primary) transition hover:border-rose-400/70 hover:text-rose-400"
                    >
                        <RotateCcw size={14} className="-ml-0.5" />
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pb-2 min-h-0">
                <div className="space-y-4">
                    <SettingCard
                        title="Appearance"
                        icon={Sun}
                        badge="app + editor"
                    >
                        <div className="flex items-center justify-between gap-3 pb-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--text-secondary)">
                                Theme sets
                            </p>
                            <button
                                onClick={() => {
                                    setThemeMode("auto");
                                    setEditorTheme("match");
                                }}
                                className="text-[11px] font-bold uppercase tracking-[0.18em] rounded-lg border border-(--border-color)/70 px-3 py-1.5 text-(--text-secondary) hover:border-(--accent-color)/70 hover:text-(--accent-color) transition"
                            >
                                Auto (system)
                            </button>
                        </div>

                            <div className="flex gap-2 flex-wrap">
                                {themeOptions.map((option) => {
                                    const isActive = option.value === themeMode;
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setThemeMode(option.value);
                                                setEditorTheme("match");
                                            }}
                                            className={`relative rounded-2xl border text-left transition-colors ${
                                                isActive
                                                    ? "border-(--accent-color) bg-(--bg-panel)/80"
                                                    : "border-(--border-color)/70 bg-(--bg-main)/70 hover:border-(--accent-color)/60"
                                            }`}
                                        >
                                            <div className="relative p-4 space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-semibold text-(--text-primary)">
                                                            {option.label}
                                                        </p>
                                                        <p className="text-[11px] text-(--text-secondary)">
                                                            {option.hint}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold ${
                                                            isActive
                                                                ? "border-(--accent-color) bg-(--accent-color)/12 text-(--accent-color)"
                                                                : "border-(--border-color)/80 text-(--text-secondary)"
                                                        }`}
                                                    >
                                                        {isActive ? "On" : ""}
                                                    </span>
                                                </div>
                                                <div className="flex gap-1.5">
                                                    {option.swatch.map(
                                                        (color) => (
                                                            <span
                                                                key={color}
                                                                className="h-2 w-full rounded-full"
                                                                style={{
                                                                    backgroundColor:
                                                                        color,
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                        <p className="text-[11px] text-(--text-secondary) leading-snug">
                            Themes drive both the app chrome and the CodeMirror
                            editor. "Auto" respects your OS setting.
                        </p>
                    </SettingCard>

                    <SettingCard title="Layout" icon={Columns}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Pill
                                active={isVertical}
                                label="Vertical stack"
                                onClick={() => setIsVertical(true)}
                                icon={Rows}
                            />
                            <Pill
                                active={!isVertical}
                                label="Side by side"
                                onClick={() => setIsVertical(false)}
                                icon={Columns}
                            />
                        </div>
                        <p className="text-[11px] text-(--text-secondary) leading-snug">
                            Decide how the editor and results sit together.
                            Switch anytime.
                        </p>
                    </SettingCard>
                    <SettingCard
                        title="Editor finesse"
                        icon={Type}
                        badge="code"
                    >
                        <div className="space-y-5">
                            <Slider
                                value={fontSize}
                                onChange={setFontSize}
                                min={12}
                                max={20}
                                label="Font size"
                                unit="px"
                            />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-(--text-primary)">
                                        Highlight palette
                                    </p>
                                    <Palette
                                        size={16}
                                        className="text-(--text-secondary)"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {paletteOptions.map((option) => (
                                        <PalettePill
                                            key={option.value}
                                            option={option}
                                            selected={
                                                editorHighlight === option.value
                                            }
                                            onClick={() =>
                                                setEditorHighlight(option.value)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <Toggle
                                    checked={showLineNumbers}
                                    onChange={() =>
                                        setShowLineNumbers(!showLineNumbers)
                                    }
                                    label="Show line numbers"
                                />
                                <Toggle
                                    checked={autoSaveHistory}
                                    onChange={() =>
                                        setAutoSaveHistory(!autoSaveHistory)
                                    }
                                    label="Persist history"
                                />
                            </div>
                        </div>
                    </SettingCard>
                </div>
            </div>
        </div>
    );
}

export default function SettingsModal() {
    const { isSettingsOpen, setIsSettingsOpen } = useSettingsStore();

    if (!isSettingsOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            title="Settings"
            maxWidth="max-w-4xl"
        >
            <SettingsContent />
        </Modal>
    );
}
