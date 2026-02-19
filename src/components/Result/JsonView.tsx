interface JsonViewProps {
    data: Record<string, unknown>[];
    fontSize: number;
}

export function JsonView({ data, fontSize }: JsonViewProps) {
    return (
        <div className="flex-1 overflow-auto custom-scrollbar p-3 sm:p-4">
            <pre
                className="text-xs font-mono text-(--text-primary) bg-(--bg-editor) p-3 sm:p-4 rounded-lg border border-(--border-color)"
                style={{
                    fontSize: `${Math.max(fontSize - 2, 10)}px`,
                    lineHeight: "1.6",
                }}
            >
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}
