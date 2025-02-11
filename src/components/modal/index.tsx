import { ComponentProps, PropsWithChildren, useEffect } from "react";
import { ViewStyle } from "react-native";
import { View, Text, useTheme } from "tamagui";
import * as NavigationBar from "expo-navigation-bar";
import { router, Stack } from "expo-router";
import { DarkTheme } from "@react-navigation/native";

export const modalOptions = {
  headerShown: true,
  animation: "slide_from_bottom",
} as ComponentProps<typeof Stack.Screen>["options"];
type Props = PropsWithChildren<ComponentProps<typeof View>>;
export default function Modal({ children, ...props }: Props) {
  const { background, background0 } = useTheme();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(background.get());

    return () => {
      NavigationBar.setBackgroundColorAsync(DarkTheme.colors.card);
    };
  }, [background, background0]);

  return (
    <View
      {...props}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        ...(props.style as ViewStyle),
      }}
    >
      {children}
    </View>
  );
}
