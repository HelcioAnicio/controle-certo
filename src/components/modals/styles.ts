import type { CSSProperties } from "react";

export const modalHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
};

export const modalTitle: CSSProperties = { fontSize: 17, fontWeight: 700 };

export const closeBtn: CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: "var(--border-soft)",
  color: "var(--text-secondary)",
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const fieldLabel: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#334155",
  marginBottom: 6,
};

export const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border)",
  fontSize: 14,
  background: "var(--bg)",
  color: "var(--text)",
};

export const formGap: CSSProperties = { display: "flex", flexDirection: "column", gap: 14 };

export const footerRow: CSSProperties = { display: "flex", gap: 10, marginTop: 22 };

export const secondaryBtn: CSSProperties = {
  flex: 1,
  padding: 13,
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "#334155",
  fontSize: 14,
  fontWeight: 600,
};

export const primaryBtn: CSSProperties = {
  flex: 1,
  padding: 13,
  borderRadius: "var(--radius-md)",
  border: "none",
  background: "var(--color-primary)",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
};

export const successBtn: CSSProperties = {
  ...primaryBtn,
  background: "var(--color-success)",
  fontWeight: 700,
};

export const dangerBtn: CSSProperties = {
  ...primaryBtn,
  background: "var(--color-danger)",
  fontWeight: 700,
};
