import React from "react";

type BadgeVariant =
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "default"
    | string;

const variantStyles: Record<string, string> = {
    Beginner: "bg-emerald-500/20 text-emerald-100 border border-emerald-500/40",
    Intermediate: "bg-amber-500/20 text-amber-100 border border-amber-500/40",
    Advanced: "bg-rose-500/20 text-rose-100 border border-rose-500/40",
    default:
        "bg-(--bg-activity-bar) text-(--text-secondary) border border-(--border-color)",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
    variant = "default",
    children,
    className = "",
    ...rest
}) => {
    const classes = variantStyles[variant] ?? variantStyles.default;
    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-full uppercase ${classes} ${className}`}
            {...rest}
        >
            {children}
        </span>
    );
};

export default Badge;
