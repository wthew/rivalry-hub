"use client";

import { AppState, Platform } from "react-native";
import { createClient, SupportedStorage } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

class SupabaseStorage {
  private getEngine() {
    if (Platform.OS !== "web") return AsyncStorage;

    if (typeof localStorage === "undefined") return null;
    return localStorage;
  }

  async getItem(key: string) {
    return this.getEngine()?.getItem(key);
  }
  async removeItem(key: string) {
    return this.getEngine()?.removeItem(key);
  }
  async setItem(key: string, value: string) {
    return this.getEngine()?.setItem(key, value);
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new SupabaseStorage() as SupportedStorage,
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.

AppState.addEventListener("change", (state) => {
  console.log({ state });
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
