import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/src/services/supabase";
import { Database } from "@/src/types/supabase";
import { PostgrestQueryBuilder as Builder } from "@supabase/postgrest-js";
import { Relation, Schema, Table } from "../types/utils";

export type Opts<
  T extends Table,
  Q extends string = "*",
  L extends number | undefined = undefined
> = {
  key: string;
  select: Q;
  filter?: [string & keyof Schema["Tables"][T]["Row"], string, unknown];
  limit?: L;
};

export default function useData<
  T extends Table,
  Q extends string = "*",
  L extends number | undefined = undefined
>(table: T, opts: Opts<T, Q, L>) {
  const { key, select, filter, limit } = opts;

  return useQuery({
    queryKey: [table, key],
    queryFn: async () => {
      const builder: Builder<Schema, Relation<T>, T> = supabase.from(table);
      const t = builder.select(select);

      if (filter) t.filter(...filter);
      if (limit) t.limit(limit);
      if (limit === 1) t.single();

      return t.then(({ data, error }) => {
        type Res = L extends 1 ? FlatArray<Array<typeof data>, 2> : typeof data;
        return data as Res;
      });
    },
  });
}
