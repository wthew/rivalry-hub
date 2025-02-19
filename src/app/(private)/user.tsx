import { Redirect } from "expo-router";
import { YStack } from "tamagui";
import React from "react";
import { useSession } from "@/src/contexts/session";
import UserPage from "@/src/components/user";

export default function ModalPage() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <YStack style={{ padding: 32, paddingLeft: 0 }}>
      <UserPage id={session.user.id} />
    </YStack>
  );
}
