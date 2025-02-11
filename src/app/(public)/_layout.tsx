import React from "react";

import { Redirect, Stack } from "expo-router";
import { useSession } from "@/src/contexts/session";

export default function TabLayout() {
  const { session } = useSession();

  if (session?.user.id) return <Redirect href={"/"} />;

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
