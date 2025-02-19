import React, { PropsWithChildren as Props, useCallback, useMemo } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";
import useData from "../hooks/useData";
import { useToast } from "react-native-toast-notifications";

type SessionContext = {
  session?: Session;
  nick?: string;
  signOut: () => Promise<void>;
};
const SessionContext = React.createContext({} as SessionContext);

export default function SessionContextProvider({ children }: Props) {
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

  const ctrl = useSessionControls();

  const value = useMemo(() => {
    return data && session
      ? { session, ...data, ...ctrl }
      : { session: undefined, ...ctrl };
  }, [session, data, ctrl]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export const useSession = () => React.useContext(SessionContext);

function useSessionControls() {
  const toast = useToast();

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.show(error.message);
  }, []);

  return { signOut } as const;
}
