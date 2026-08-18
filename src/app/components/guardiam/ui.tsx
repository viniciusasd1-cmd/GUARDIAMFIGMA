import { motion } from "motion/react";
import {
  Shield,
  Bell,
  Menu as MenuIcon,
  ChevronRight,
  MapPin,
  Users,
  AlertTriangle,
  Loader2,
  WifiOff,
  Inbox,
  X,
  Check,
  type LucideIcon,
} from "lucide-react";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Tone helpers                                                        */
/* ------------------------------------------------------------------ */
export type Tone = "brand" | "active" | "warn" | "sos" | "neutral";

const toneColor: Record<Tone, string> = {
  brand: "var(--g-brand)",
  active: "var(--g-active)",
  warn: "var(--g-warn)",
  sos: "var(--g-sos)",
  neutral: "var(--g-text-3)",
};
const toneSoft: Record<Tone, string> = {
  brand: "var(--g-brand-soft)",
  active: "var(--g-active-soft)",
  warn: "var(--g-warn-soft)",
  sos: "var(--g-sos-soft)",
  neutral: "rgba(107,124,151,0.16)",
};

/* ------------------------------------------------------------------ */
/* Shield logo mark                                                    */
/* ------------------------------------------------------------------ */
export function ShieldMark({ size = 34, tone = "brand" as Tone }) {
  return (
    <div
      className="flex items-center justify-center rounded-[12px] shrink-0"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(150deg, var(--g-brand), var(--g-brand-2))",
        boxShadow: "0 6px 18px rgba(46,139,255,0.4)",
      }}
    >
      <Shield size={size * 0.55} color="#04101F" strokeWidth={2.6} fill="#04101F" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */
export function Header({
  onMenu,
  onBell,
  notifications = 0,
}: {
  onMenu?: () => void;
  onBell?: () => void;
  notifications?: number;
}) {
  return (
    <header className="flex items-center justify-between px-5 pt-2 pb-3">
      <div className="flex items-center gap-2.5">
        <ShieldMark size={32} />
        <span
          className="g-font-display tracking-[0.14em]"
          style={{ color: "var(--g-text)", fontWeight: 800, fontSize: 18 }}
        >
          GUARDIAM
        </span>
      </div>
      <div className="flex items-center gap-2">
        <IconButton onClick={onBell} badge={notifications}>
          <Bell size={20} />
        </IconButton>
        <IconButton onClick={onMenu}>
          <MenuIcon size={20} />
        </IconButton>
      </div>
    </header>
  );
}

export function IconButton({
  children,
  onClick,
  badge = 0,
}: {
  children: ReactNode;
  onClick?: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center rounded-full active:scale-95 transition-transform"
      style={{
        width: 42,
        height: 42,
        background: "var(--g-surface-2)",
        border: "1px solid var(--g-border)",
        color: "var(--g-text-2)",
      }}
    >
      {children}
      {badge > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full"
          style={{
            minWidth: 18,
            height: 18,
            padding: "0 5px",
            background: "var(--g-sos)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */
export function PrimaryButton({
  children,
  onClick,
  tone = "brand",
  icon: Icon,
  disabled,
  loading,
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: Tone;
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
}) {
  const grad =
    tone === "active"
      ? "linear-gradient(135deg, #2FD98A, #1FB874)"
      : tone === "sos"
      ? "linear-gradient(135deg, #FF5A5F, #E23B4E)"
      : tone === "warn"
      ? "linear-gradient(135deg, #FFC24B, #F5A623)"
      : "linear-gradient(135deg, var(--g-brand), #1E6FE0)";
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full flex items-center justify-center gap-2.5 rounded-[16px] px-5"
      style={{
        height: 56,
        background: grad,
        color: tone === "warn" ? "#2B1D00" : "#04101F",
        fontFamily: "Manrope, sans-serif",
        fontWeight: 700,
        fontSize: 16,
        opacity: disabled ? 0.45 : 1,
        boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
      }}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        Icon && <Icon size={20} strokeWidth={2.6} />
      )}
      {children}
    </motion.button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  icon: Icon,
  tone = "neutral",
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  tone?: Tone;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2.5 rounded-[16px] px-5"
      style={{
        height: 54,
        background: "var(--g-surface-2)",
        border: `1px solid ${tone === "neutral" ? "var(--g-border-strong)" : toneColor[tone]}`,
        color: tone === "neutral" ? "var(--g-text)" : toneColor[tone],
        fontFamily: "Manrope, sans-serif",
        fontWeight: 600,
        fontSize: 15,
      }}
    >
      {Icon && <Icon size={19} strokeWidth={2.4} />}
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
export function Card({
  children,
  className = "",
  onClick,
  raised,
  style,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  raised?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-[22px] ${onClick ? "active:scale-[0.99] transition-transform cursor-pointer" : ""} ${className}`}
      style={{
        background: raised ? "var(--g-surface-2)" : "var(--g-surface)",
        border: "1px solid var(--g-border)",
        boxShadow: raised ? "var(--g-shadow-md)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status badge                                                        */
/* ------------------------------------------------------------------ */
export function StatusBadge({
  tone,
  children,
  pulse,
}: {
  tone: Tone;
  children: ReactNode;
  pulse?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full"
      style={{
        padding: "5px 11px",
        background: toneSoft[tone],
        color: toneColor[tone],
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.03em",
      }}
    >
      <span className="relative flex" style={{ width: 8, height: 8 }}>
        {pulse && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: toneColor[tone] }}
            animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        )}
        <span className="rounded-full" style={{ width: 8, height: 8, background: toneColor[tone] }} />
      </span>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Metric card (overview tiles)                                        */
/* ------------------------------------------------------------------ */
export function MetricCard({
  icon: Icon,
  label,
  value,
  tone = "brand",
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: Tone;
  onClick?: () => void;
}) {
  return (
    <Card onClick={onClick} className="p-3.5 flex-1">
      <div
        className="flex items-center justify-center rounded-[12px] mb-3"
        style={{ width: 38, height: 38, background: toneSoft[tone], color: toneColor[tone] }}
      >
        <Icon size={19} strokeWidth={2.4} />
      </div>
      <div style={{ color: "var(--g-text)", fontSize: 18, fontWeight: 700, fontFamily: "Manrope" }}>
        {value}
      </div>
      <div style={{ color: "var(--g-text-3)", fontSize: 12, marginTop: 2 }}>{label}</div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Alert card                                                          */
/* ------------------------------------------------------------------ */
export function AlertCard({
  title,
  time,
  location,
  status,
  tone = "sos",
}: {
  title: string;
  time: string;
  location: string;
  status: string;
  tone?: Tone;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center rounded-[12px] shrink-0"
          style={{ width: 40, height: 40, background: toneSoft[tone], color: toneColor[tone] }}
        >
          <AlertTriangle size={20} strokeWidth={2.4} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span style={{ color: "var(--g-text)", fontWeight: 600, fontSize: 15 }}>{title}</span>
            <StatusBadge tone={tone}>{status}</StatusBadge>
          </div>
          <div className="flex items-center gap-1.5 mt-2" style={{ color: "var(--g-text-3)", fontSize: 13 }}>
            <MapPin size={13} /> {location}
          </div>
          <div style={{ color: "var(--g-text-3)", fontSize: 12, marginTop: 3 }}>{time}</div>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Contact card                                                        */
/* ------------------------------------------------------------------ */
export function ContactCard({
  name,
  phone,
  primary,
  initials,
  onEdit,
}: {
  name: string;
  phone: string;
  primary?: boolean;
  initials: string;
  onEdit?: () => void;
}) {
  return (
    <Card className="p-3.5 flex items-center gap-3">
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{
          width: 46,
          height: 46,
          background: primary ? "linear-gradient(135deg, var(--g-brand), var(--g-brand-2))" : "var(--g-surface-3)",
          color: primary ? "#04101F" : "var(--g-text-2)",
          fontWeight: 700,
          fontFamily: "Manrope",
        }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--g-text)", fontWeight: 600, fontSize: 15 }}>{name}</span>
          {primary && <StatusBadge tone="brand">Principal</StatusBadge>}
        </div>
        <div style={{ color: "var(--g-text-3)", fontSize: 13, marginTop: 1 }}>{phone}</div>
      </div>
      <button
        onClick={onEdit}
        className="rounded-full active:scale-90 transition-transform"
        style={{ width: 34, height: 34, background: "var(--g-surface-3)", color: "var(--g-text-2)" }}
      >
        <ChevronRight size={18} className="mx-auto" />
      </button>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* States                                                              */
/* ------------------------------------------------------------------ */
export function LoadingState({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" style={{ color: "var(--g-text-3)" }}>
      <Loader2 size={34} className="animate-spin" style={{ color: "var(--g-brand)" }} />
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 py-14 px-8">
      <div
        className="flex items-center justify-center rounded-[18px] mb-2"
        style={{ width: 60, height: 60, background: "var(--g-surface-2)", color: "var(--g-text-3)" }}
      >
        <Icon size={28} />
      </div>
      <span style={{ color: "var(--g-text)", fontWeight: 600, fontSize: 16 }}>{title}</span>
      <span style={{ color: "var(--g-text-3)", fontSize: 14, maxWidth: 260 }}>{description}</span>
      {action && <div className="mt-4 w-full">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Algo deu errado",
  description,
  onRetry,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 py-14 px-8">
      <div
        className="flex items-center justify-center rounded-[18px] mb-2"
        style={{ width: 60, height: 60, background: "var(--g-sos-soft)", color: "var(--g-sos)" }}
      >
        <AlertTriangle size={28} />
      </div>
      <span style={{ color: "var(--g-text)", fontWeight: 600, fontSize: 16 }}>{title}</span>
      <span style={{ color: "var(--g-text-3)", fontSize: 14, maxWidth: 260 }}>{description}</span>
      {onRetry && (
        <div className="mt-4 w-full max-w-[220px]">
          <SecondaryButton onClick={onRetry}>Tentar novamente</SecondaryButton>
        </div>
      )}
    </div>
  );
}

export function OfflineBanner() {
  return (
    <div
      className="flex items-center gap-2 rounded-[12px] px-3.5 py-2.5 mx-5"
      style={{ background: "var(--g-warn-soft)", color: "var(--g-warn)" }}
    >
      <WifiOff size={16} />
      <span style={{ fontSize: 13, fontWeight: 500 }}>Sem conexão — reconectando...</span>
    </div>
  );
}

export { toneColor, toneSoft, Check, X, ChevronRight, MapPin, Users, Bell, Shield };
