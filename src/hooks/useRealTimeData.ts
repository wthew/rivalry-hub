import { useCallback, useEffect } from "react";
import { Table } from "../types/utils";
import useData, { Opts } from "./useData";
import { supabase } from "../services/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type RealTimeOpts<
  T extends Table,
  Q extends string = "*",
  L extends number | undefined = undefined
> = Opts<T, Q, L> & {
  cb: <T>(payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => T;
};

export default function useRealTimeData<
  T extends Table,
  Q extends string,
  L extends number | undefined
  R extends ReturnType<typeof useData>
>(table: T, { key, select, filter, limit, cb }: RealTimeOpts<T, Q, L>) {
  const data = useData(table, { key, select, filter, limit });

  const callback = useCallback(() => {

  }, [])

  useEffect(() => {
    const channel = supabase
      .channel(table)
      .on("postgres_changes", { event: "*", schema: "public", table }, cb)
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return data
}
