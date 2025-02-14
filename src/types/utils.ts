import { Database } from "./supabase";

export type Schema = Database[Extract<keyof Database, "public">];
export type Table = keyof Schema["Tables"];
export type Relation<T extends Table> = Schema["Tables"][T];
