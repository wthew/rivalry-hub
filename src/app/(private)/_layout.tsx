import React, { useMemo } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useMedia } from "tamagui";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { xl } = useMedia();

  const options: React.ComponentProps<typeof Tabs>["screenOptions"] = useMemo(
    () => ({
      tabBarPosition: xl ? "left" : "bottom",
      animation: xl ? "fade" : "shift",
      headerTransparent: true,
      tabBarStyle: { paddingBottom: 16 },
      title: 'teste'
    } as const),
    [xl]
  );

  return (
    <Tabs screenOptions={options} >
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
    </Tabs>
  );
}
