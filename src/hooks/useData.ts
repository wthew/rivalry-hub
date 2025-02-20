import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/src/services/supabase";
import { PostgrestQueryBuilder as Builder } from "@supabase/postgrest-js";
import { Relation, Schema, Table } from "../types/utils";

export type Opts<
  T extends Table,
  Q extends string = "*",
  L extends number | undefined = undefined
> = {
  key: string | string[];
  select: Q;
  filter?: [string & keyof Schema["Tables"][T]["Row"], string, unknown];
  limit?: L;
  skip?: boolean;
};

export default function useData<
  T extends Table,
  Q extends string = "*",
  L extends number | undefined = undefined
>(table: T, opts: Opts<T, Q, L>) {
  const { key, select, filter, limit, skip } = opts;

  return useQuery({
    queryKey: Array.isArray(key) ? [table, ...key] : [table, key],
    queryFn: async () => {
      if (skip) return undefined;

      const builder: Builder<Schema, Relation<T>, T> = supabase.from(table);
      const t = builder.select(select);

      if (filter) t.filter(...filter);
      if (limit) t.limit(limit);
      if (limit === 1) t.single();

      return t.then(({ data, error }) => {
        if (error) console.error(error);
        else console.info(data);
        type Res = L extends 1
          ? FlatArray<Array<typeof data>, 2>
          : NonNullable<typeof data>;
        return data as Res;
      });
    },
  });
}
