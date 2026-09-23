import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

const cn = (...args: Parameters<typeof clsx>) => clsx(args);

/* ---------- Button ---------- */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-white text-sky-900 shadow-[0_4px_16px_rgba(56,118,186,0.3)] hover:scale-[1.03] active:scale-95": variant === "primary",
          "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 active:scale-95": variant === "secondary",
          "text-white/70 hover:bg-white/10 hover:text-white": variant === "ghost",
          "bg-red-500/90 text-white shadow-[0_4px_16px_rgba(239,68,68,0.25)] hover:bg-red-500 active:scale-95": variant === "danger",
        },
        {
          "px-3 py-1.5 text-xs": size === "sm",
          "px-5 py-2.5 text-[13px]": size === "md",
          "px-6 py-3 text-sm": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------- Input ---------- */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "rounded-xl border border-white/15 bg-sky-950/40 px-3.5 py-2.5 text-sm text-white shadow-sm backdrop-blur-sm transition-colors placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 [color-scheme:dark]",
          error && "border-red-400/60 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-300" role="alert">{error}</p>}
    </div>
  );
}

/* ---------- Textarea ---------- */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-[13px] font-medium text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "rounded-xl border border-white/15 bg-sky-950/40 px-3.5 py-2.5 text-sm text-white shadow-sm backdrop-blur-sm transition-colors placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 [color-scheme:dark]",
          error && "border-red-400/60 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-300" role="alert">{error}</p>}
    </div>
  );
}

/* ---------- Select ---------- */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, error, className, id, children, ...props }: SelectProps) {
  const selectId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-[13px] font-medium text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "w-full cursor-pointer appearance-none rounded-full border border-white/15 bg-sky-950/40 px-4 py-2.5 pr-10 text-sm text-white shadow-sm backdrop-blur-sm transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 hover:bg-sky-950/55 [color-scheme:dark]",
            error && "border-red-400/60 focus:border-red-400 focus:ring-red-400/20",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" aria-hidden="true" strokeWidth={2.5} />
      </div>
      {error && <p className="text-xs font-medium text-red-300" role="alert">{error}</p>}
    </div>
  );
}

/* ---------- Card ---------- */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-sky-950/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,15,35,0.2)]", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("border-b border-white/10 px-6 py-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn("text-base font-semibold text-white", className)} style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>{children}</h3>;
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

/* ---------- Badge ---------- */
type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

export function Badge({ variant = "neutral", children }: { variant?: BadgeVariant; children: ReactNode }) {
  const styles: Record<BadgeVariant, string> = {
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    warning: "bg-amber-500/15 text-amber-300 border-amber-400/30",
    danger: "bg-red-500/15 text-red-300 border-red-400/30",
    info: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    neutral: "bg-white/10 text-white/70 border-white/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm",
        styles[variant]
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Table primitives ---------- */
export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function TableHeader({ children }: { children: ReactNode }) {
  return <thead className="border-b border-white/15 bg-white/5 text-xs uppercase tracking-wide text-white/60">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-white/5">{children}</tbody>;
}

export function TableRow({ children, className, ...props }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("transition-colors hover:bg-white/5", className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className }: { children: ReactNode; className?: string }) {
  return <th scope="col" className={cn("px-4 py-3 font-semibold text-white/70", className)}>{children}</th>;
}

export function TableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3 text-white/90", className)}>{children}</td>;
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xl animate-fade-in" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-sky-950/60 shadow-[0_30px_120px_rgba(0,15,35,0.5)] backdrop-blur-2xl animate-scale-in">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-white" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>{title}</h2>
          <button onClick={onClose} className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30" aria-label="Close dialog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
