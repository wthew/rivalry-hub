import { router } from "expo-router";
import { Button, Text } from "tamagui";
import Modal from "../components/modal/index";
import { supabase } from "../services/supabase";
import { useToast } from "react-native-toast-notifications";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function ModalPage() {
  const toast = useToast();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) toast.show(error.message);

    router.replace('/');
  }

  if (!session) return <></>;

  return (
    <Modal>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Perfil: {session.user.id}
      </Text>

      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </Modal>
  );
}
