import "server-only";
import { cache } from "react";
import { db } from "./db";

export type UserSettings = {
  monthStartDay: number;
};

export const getUserSettings = cache(async (userId: string): Promise<UserSettings> => {
  const row = await db.orm.public.UserSettings.where({ userId }).first();
  return { monthStartDay: row?.monthStartDay ?? 1 };
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
