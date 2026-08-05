import "server-only";
import { cache } from "react";
import { db } from "./db";

export type UserSettings = {
  monthStartDay: number;
  trackingStartPeriod: string | null;
};

export const getUserSettings = cache(async (userId: string): Promise<UserSettings> => {
  const row = await db.orm.public.UserSettings.where({ userId }).first();
  return {
    monthStartDay: row?.monthStartDay ?? 1,
    trackingStartPeriod: row?.trackingStartPeriod ?? null,
  };
});

export async function setMonthStartDay(userId: string, monthStartDay: number): Promise<void> {
  const clamped = Math.min(Math.max(Math.round(monthStartDay), 1), 28);
  const existing = await db.orm.public.UserSettings.where({ userId }).first();
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
