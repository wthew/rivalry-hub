import { useEffect } from "react";
import { Table } from "../types/utils";
import useData, { Opts } from "./useData";
import { supabase } from "../services/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

type RealTimeOpts<
  T extends Table,
  Q extends string = "*",
  L extends number | undefined = undefined,
  D extends ReturnType<typeof useData<T, Q, L>>["data"] = undefined
> = Opts<T, Q, L> & {
  cb: (
    payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
    old: D
  ) => D;
};

export default function useRealTimeData<
  T extends Table,
  Q extends string,
  L extends number | undefined,
  D extends ReturnType<typeof useData<T, Q, L>>["data"]
>(table: T, { key, select, filter, limit, cb }: RealTimeOpts<T, Q, L, D>) {
  const data = useData(table, { key, select, filter, limit });
  const client = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(table)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          client.setQueriesData(
            { queryKey: [table, Array.isArray(key) ? [...key] : key] },
            (old: any) => cb(payload, old)
          );
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [client]);

  return data;
}
