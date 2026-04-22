import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "error";

interface Props {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: React.ReactNode; color: string; bg: string }> = {
  info: {
    icon: <Info size={15} />,
    color: "var(--accent)",
    bg: "rgba(124,106,255,0.08)",
  },
  warning: {
    icon: <AlertTriangle size={15} />,
    color: "var(--accent-amber)",
    bg: "rgba(245,158,11,0.08)",
  },
  success: {
    icon: <CheckCircle size={15} />,
    color: "var(--accent2)",
    bg: "rgba(0,212,170,0.08)",
  },
  error: {
    icon: <XCircle size={15} />,
    color: "var(--accent3)",
    bg: "rgba(255,107,107,0.08)",
  },
};

export default function Callout({ type = "info", title, children }: Props) {
  const { icon, color, bg } = config[type];

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${color}35`,
        borderLeft: `3px solid ${color}`,
        borderRadius: "8px",
        padding: "1rem 1.25rem",
        margin: "1.5rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: title || children ? "0.5rem" : 0,
          color,
        }}
      >
        {icon}
        {title && (
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color,
            }}
          >
            {title}
          </span>
        )}
      </div>
      {children && (
        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
