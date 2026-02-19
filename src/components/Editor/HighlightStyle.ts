import { tags } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";

type HighlightKey = "balanced" | "vibrant" | "soft" | "contrast";

const balancedDark = HighlightStyle.define([
    { tag: tags.keyword, color: "#a78bfa", fontWeight: "600" },
    { tag: tags.operator, color: "#e2e8f0" },
    { tag: tags.string, color: "#f8c7a8" },
    { tag: tags.number, color: "#7dd3fc" },
    { tag: tags.bool, color: "#fcd34d" },
    { tag: tags.null, color: "#f472b6" },
    { tag: tags.comment, color: "#94a3b8", fontStyle: "italic" },
    { tag: tags.variableName, color: "#e5e7eb" },
    { tag: tags.function(tags.variableName), color: "#f472b6" },
    { tag: tags.typeName, color: "#5eead4" },
    { tag: tags.propertyName, color: "#cbd5e1" },
    { tag: tags.punctuation, color: "#e2e8f0" },
    { tag: tags.bracket, color: "#a5b4fc" },
]);

const balancedLight = HighlightStyle.define([
    { tag: tags.keyword, color: "#6b21a8", fontWeight: "600" },
    { tag: tags.operator, color: "#334155" },
    { tag: tags.string, color: "#c2410c" },
    { tag: tags.number, color: "#2563eb" },
    { tag: tags.bool, color: "#0f766e" },
    { tag: tags.null, color: "#9d174d" },
    { tag: tags.comment, color: "#94a3b8", fontStyle: "italic" },
    { tag: tags.variableName, color: "#0f172a" },
    { tag: tags.function(tags.variableName), color: "#7c2d12" },
    { tag: tags.typeName, color: "#115e59" },
    { tag: tags.propertyName, color: "#1f2937" },
    { tag: tags.punctuation, color: "#475569" },
    { tag: tags.bracket, color: "#2563eb" },
]);

const vibrantDark = HighlightStyle.define([
    {
        tag: tags.keyword,
        color: "#ec43deff",
        fontWeight: "500",
        fontStyle: "oblique",
    },
    { tag: tags.operator, color: "#d4d4d4" },
    { tag: tags.string, color: "#ce9178" },
    { tag: tags.number, color: "#b5cea8" },
    { tag: tags.bool, color: "#569cd6" },
    { tag: tags.null, color: "#569cd6" },
    { tag: tags.comment, color: "#6a9955", fontStyle: "italic" },
    { tag: tags.variableName, color: "#9cdc5e" },
    { tag: tags.function(tags.variableName), color: "#dcdcaa" },
    { tag: tags.typeName, color: "#4ec9b0" },
    { tag: tags.propertyName, color: "#d4d4d4" },
    { tag: tags.punctuation, color: "#d4d4d4" },
    { tag: tags.bracket, color: "#ffd700" },
]);

const vibrantLight = HighlightStyle.define([
    { tag: tags.keyword, color: "#6d28d9", fontWeight: "600" },
    { tag: tags.operator, color: "#334155" },
    { tag: tags.string, color: "#b45309" },
    { tag: tags.number, color: "#0ea5e9" },
    { tag: tags.bool, color: "#0f766e" },
    { tag: tags.null, color: "#9333ea" },
    { tag: tags.comment, color: "#9ca3af", fontStyle: "italic" },
    { tag: tags.variableName, color: "#0f172a" },
    { tag: tags.function(tags.variableName), color: "#b91c1c" },
    { tag: tags.typeName, color: "#0f766e" },
    { tag: tags.propertyName, color: "#334155" },
    { tag: tags.punctuation, color: "#475569" },
    { tag: tags.bracket, color: "#2563eb" },
]);

const softDark = HighlightStyle.define([
    { tag: tags.keyword, color: "#c084fc" },
    { tag: tags.operator, color: "#cbd5f5" },
    { tag: tags.string, color: "#fca5a5" },
    { tag: tags.number, color: "#f9a8d4" },
    { tag: tags.bool, color: "#7dd3fc" },
    { tag: tags.null, color: "#93c5fd" },
    { tag: tags.comment, color: "#94a3b8", fontStyle: "italic" },
    { tag: tags.variableName, color: "#e0e7ff" },
    { tag: tags.function(tags.variableName), color: "#f5d0fe" },
    { tag: tags.typeName, color: "#a5f3fc" },
    { tag: tags.propertyName, color: "#e0e7ff" },
    { tag: tags.punctuation, color: "#cbd5e1" },
    { tag: tags.bracket, color: "#fde68a" },
]);

const softLight = HighlightStyle.define([
    { tag: tags.keyword, color: "#7c3aed" },
    { tag: tags.operator, color: "#475569" },
    { tag: tags.string, color: "#c2410c" },
    { tag: tags.number, color: "#2563eb" },
    { tag: tags.bool, color: "#0ea5e9" },
    { tag: tags.null, color: "#f472b6" },
    { tag: tags.comment, color: "#94a3b8", fontStyle: "italic" },
    { tag: tags.variableName, color: "#111827" },
    { tag: tags.function(tags.variableName), color: "#b45309" },
    { tag: tags.typeName, color: "#0f766e" },
    { tag: tags.propertyName, color: "#1f2937" },
    { tag: tags.punctuation, color: "#475569" },
    { tag: tags.bracket, color: "#c084fc" },
]);

const contrastDark = HighlightStyle.define([
    { tag: tags.keyword, color: "#f97316", fontWeight: "600" },
    { tag: tags.operator, color: "#fbbf24" },
    { tag: tags.string, color: "#22d3ee" },
    { tag: tags.number, color: "#a3e635" },
    { tag: tags.bool, color: "#facc15" },
    { tag: tags.null, color: "#facc15" },
    { tag: tags.comment, color: "#94a3b8", fontStyle: "italic" },
    { tag: tags.variableName, color: "#e5e7eb" },
    { tag: tags.function(tags.variableName), color: "#fb7185" },
    { tag: tags.typeName, color: "#38bdf8" },
    { tag: tags.propertyName, color: "#e2e8f0" },
    { tag: tags.punctuation, color: "#f8fafc" },
    { tag: tags.bracket, color: "#f97316" },
]);

const contrastLight = HighlightStyle.define([
    { tag: tags.keyword, color: "#c2410c", fontWeight: "600" },
    { tag: tags.operator, color: "#111827" },
    { tag: tags.string, color: "#0369a1" },
    { tag: tags.number, color: "#166534" },
    { tag: tags.bool, color: "#854d0e" },
    { tag: tags.null, color: "#854d0e" },
    { tag: tags.comment, color: "#6b7280", fontStyle: "italic" },
    { tag: tags.variableName, color: "#111827" },
    { tag: tags.function(tags.variableName), color: "#7c2d12" },
    { tag: tags.typeName, color: "#0f172a" },
    { tag: tags.propertyName, color: "#111827" },
    { tag: tags.punctuation, color: "#0f172a" },
    { tag: tags.bracket, color: "#b45309" },
]);

export const highlightStyles: Record<
    HighlightKey,
    { light: HighlightStyle; dark: HighlightStyle }
> = {
    balanced: { light: balancedLight, dark: balancedDark },
    vibrant: { light: vibrantLight, dark: vibrantDark },
    soft: { light: softLight, dark: softDark },
    contrast: { light: contrastLight, dark: contrastDark },
};

export type HighlightStyleKey = HighlightKey;
