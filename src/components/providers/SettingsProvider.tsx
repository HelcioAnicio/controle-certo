"use client";

import { createContext, useContext } from "react";

type SettingsContextValue = {
  monthStartDay: number;
  trackingStartPeriod: string | null;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({
  monthStartDay,
  trackingStartPeriod,
  children,
}: SettingsContextValue & { children: React.ReactNode }) {
  return (
    <SettingsContext.Provider value={{ monthStartDay, trackingStartPeriod }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
