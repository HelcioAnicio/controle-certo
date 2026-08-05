import "server-only";
import { cache } from "react";
import { db } from "./db";

export type UserSettings = {
  monthStartDay: number;
  trackingStartPeriod: string | null;
};

/**
 * `trackingStartPeriod` is read separately, with its own column selected and
 * wrapped in a try/catch: this lets the app be deployed before the
 * `trackingStartPeriod` migration has run against the live database (e.g.
 * blocked by a firewall) without breaking every page's settings read —
 * it just falls back to "no floor" until the column actually exists.
 */
export const getUserSettings = cache(async (userId: string): Promise<UserSettings> => {
  const row = await db.orm.public.UserSettings.where({ userId }).select("monthStartDay").first();
  let trackingStartPeriod: string | null = null;
  try {
    const trackingRow = await db.orm.public.UserSettings.where({ userId }).select("trackingStartPeriod").first();
    trackingStartPeriod = trackingRow?.trackingStartPeriod ?? null;
  } catch {
    trackingStartPeriod = null;
  }
  return {
    monthStartDay: row?.monthStartDay ?? 1,
    trackingStartPeriod,
  };
});

export async function setMonthStartDay(userId: string, monthStartDay: number): Promise<void> {
  const clamped = Math.min(Math.max(Math.round(monthStartDay), 1), 28);
  const existing = await db.orm.public.UserSettings.where({ userId }).select("id").first();
  if (existing) {
    await db.orm.public.UserSettings.where({ userId }).update({ monthStartDay: clamped });
  } else {
    await db.orm.public.UserSettings.create({ userId, monthStartDay: clamped });
  }
}

/** The first period the user wants tracked; periods before it are never generated or shown. `null` clears the floor. */
export async function setTrackingStartPeriod(userId: string, period: string | null): Promise<void> {
  const existing = await db.orm.public.UserSettings.where({ userId }).first();
  if (existing) {
    await db.orm.public.UserSettings.where({ userId }).update({ trackingStartPeriod: period });
  } else {
    await db.orm.public.UserSettings.create({ userId, trackingStartPeriod: period });
  }
}
