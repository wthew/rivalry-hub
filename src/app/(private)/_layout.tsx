import React, { useEffect, useMemo, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import { useMedia } from "tamagui";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/src/services/supabase";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSession } from "@/src/contexts/session";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { xl } = useMedia();
  const height = useHeaderHeight();
  const { session } = useSession();
  const toast = useToast();

  const options: React.ComponentProps<typeof Tabs>["screenOptions"] = useMemo(
    () =>
      ({
        tabBarPosition: xl ? "left" : "bottom",
        animation: xl ? "fade" : "shift",
        headerTransparent: true,
        tabBarStyle: { paddingBottom: 16 },
        title: "teste",
        sceneStyle: { paddingTop: height },
      } as const),
    [xl]
  );

  if (!session?.user.id) return <Redirect href={"/sign-in"} />;

  return (
    <Tabs screenOptions={options}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user/index"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerTitle: () => <>User: {session.user.email}</>,
          headerRight: ({ tintColor }) => (
            <Pressable
            style={{ marginRight: 8 }}
              onPress={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) toast.show(error.message);
              }}
            >
              <MaterialIcons name="logout" color={tintColor} size={32} />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
