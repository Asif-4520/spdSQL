import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyBtnProps {
    text: string;
}

export function CopyBtn({ text }: CopyBtnProps) {
    const [copied, setCopied] = useState(false);

    function copy() {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <button
            onClick={copy}
            className="p-1 hover:bg-(--bg-activity-bar) rounded transition-colors shrink-0"
            title="Copy"
        >
            {copied ? (
                <Check size={12} className="text-emerald-500" />
            ) : (
                <Copy size={12} className="text-(--text-secondary)" />
            )}
        </button>
    );
}
