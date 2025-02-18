import React, { PropsWithChildren } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";
import useData from "../hooks/useData";

type SessionContext = { session?: Session; nick?: string };
const SessionContext = React.createContext({} as SessionContext);

export default function SessionContextProvider(props: PropsWithChildren) {
  const [session, setSession] = React.useState<Session | undefined>(undefined);

  const { data } = useData("profiles", {
    key: ["user_nick", session?.user.id || ""],
    select: "nick",
    filter: ["id", "eq", session?.user.id],
    limit: 1,
  });

  React.useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(undefined);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={data ? { session, ...data } : {}}>
      {props.children}
    </SessionContext.Provider>
  );
}

export const useSession = () => React.useContext(SessionContext);
