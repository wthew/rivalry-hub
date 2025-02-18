import React, { useMemo } from "react";
import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useMedia } from "tamagui";
import { supabase } from "@/src/services/supabase";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSession } from "@/src/contexts/session";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { lg } = useMedia();
  const height = useHeaderHeight();
  const { session, nick } = useSession();
  const toast = useToast();

  const options: React.ComponentProps<typeof Tabs>["screenOptions"] = useMemo(
    () =>
      ({
        tabBarPosition: lg ? "left" : "bottom",
        animation: lg ? "fade" : "shift",
        tabBarVariant: lg ? "material" : "uikit",
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: { marginTop: lg ? 4 : 0 },
        headerTransparent: true,
        tabBarStyle: { paddingBottom: 16 },
        sceneStyle: { paddingTop: height },
      } as const),
    [lg]
  );

  if (!session?.user.id) return <Redirect href={"/sign-in"} />;

  const tabs = {
    clan: (
      <Tabs.Screen
        key="clan"
        name="clan"
        options={{
          title: "My Clan",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house-flag" size={18} color={color} />
          ),
        }}
      />
    ),
    index: (
      <Tabs.Screen
        key="index"
        name="index"
        options={{
          headerTitle: `Wellcome ${nick}!`,
          title: `Home`,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="castle" size={24} color={color} />
          ),
        }}
      />
    ),
    user: (
      <Tabs.Screen
        key="user"
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="shield-sword"
              size={24}
              color={color}
            />
          ),
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
    ),
  };

  return (
    <Tabs initialRouteName="index" screenOptions={options}>
      {lg
        ? [tabs.index, tabs.clan, tabs.user]
        : [tabs.clan, tabs.index, tabs.user]}
    </Tabs>
  );
}
