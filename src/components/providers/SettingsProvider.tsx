"use client";

import { createContext, useContext } from "react";

type SettingsContextValue = {
  monthStartDay: number;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({
  monthStartDay,
  children,
}: SettingsContextValue & { children: React.ReactNode }) {
  return (
    <SettingsContext.Provider value={{ monthStartDay }}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
