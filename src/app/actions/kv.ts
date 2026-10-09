"use server";

import { kv } from "@vercel/kv";
import { TEMPORARY_CLOSURES } from "@/lib/calendar";

export async function getClosures() {
  try {
    const closures = await kv.get<Record<string, string>>("kenocha_closures");
    return closures || TEMPORARY_CLOSURES;
  } catch (error) {
    console.error("Failed to fetch closures from KV:", error);
    // If KV is not set up yet, fallback to local constants
    return TEMPORARY_CLOSURES;
  }
}

export async function saveClosures(closures: Record<string, string>) {
  try {
    await kv.set("kenocha_closures", closures);
    return { success: true };
  } catch (error) {
    console.error("Failed to save closures to KV:", error);
    return { success: false, error: String(error) };
  }
}
