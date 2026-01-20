import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "icon";
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
        "bg-(--accent-color) text-white hover:bg-(--accent-color)/90 shadow-lg shadow-(--accent-color)/20",
    secondary:
        "bg-(--bg-activity-bar) text-(--text-primary) border border-(--border-color) hover:bg-(--bg-panel)",
    ghost: "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-activity-bar)",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-2 text-xs gap-2",
    md: "px-4 py-2.5 text-sm gap-2",
    icon: "p-2 text-sm w-9 h-9",
};

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    isLoading = false,
    icon,
    children,
    className,
    disabled,
    ...rest
}) => {
    const spacing = icon && !isLoading ? "ml-1" : "";
    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={classes} disabled={disabled || isLoading} {...rest}>
            {isLoading && (
                <span className="w-3 h-3 border-2 border-white/60 border-t-transparent rounded-full animate-spin mr-2" />
            )}
            {!isLoading && icon}
            <span className={spacing}>{children}</span>
        </button>
    );
};

export default Button;
