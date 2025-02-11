import React, { PropsWithChildren } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

type SessionContext = { session: Session | null };
const SessionContext = React.createContext({} as SessionContext);

export default function SessionContextProvider(props: PropsWithChildren) {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {props.children}
    </SessionContext.Provider>
  );
}

export const useSession = () => React.useContext(SessionContext);
