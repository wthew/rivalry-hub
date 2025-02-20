import React, { useMemo } from "react";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useMedia, useTheme, useConfiguration } from "tamagui";
import { useSession } from "@/src/contexts/session";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const { lg } = useMedia();
  const { background } = useTheme();
  const { tokens } = useConfiguration();

  const { session, nick } = useSession();

  const options: React.ComponentProps<typeof Tabs>["screenOptions"] = useMemo(
    () =>
      ({
        tabBarPosition: lg ? "left" : "bottom",
        animation: lg ? "fade" : "shift",
        tabBarVariant: lg ? "material" : "uikit",
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: { marginTop: lg ? 4 : 0 },
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 16,
          borderTopWidth: 0,
          borderRightWidth: 0,
        },
        sceneStyle: {
          paddingLeft: 32,
          backgroundColor: background.val,
          borderTopLeftRadius: lg ? (tokens.radius as any)["6"].val : undefined,
        },
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
          // headerLeftContainerStyle: { paddingLeft: 16, paddingRight: 4 },
          // headerLeft: ({ tintColor }) => (
          //   <FontAwesome name="user-circle" color={tintColor} size={32} />
          // ),
          // headerTitle: `${nick}`,
          // headerRight: ({ tintColor }) => (
          //   <Pressable
          //     style={{ marginRight: 8 }}
          //     onPress={async () => {
          //       const { error } = await supabase.auth.signOut();
          //       if (error) toast.show(error.message);
          //     }}
          //   >
          //     <MaterialIcons name="logout" color={tintColor} size={32} />
          //   </Pressable>
          // ),
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
