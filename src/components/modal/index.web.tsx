import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { ComponentProps, PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Text, useTheme } from "tamagui";

export const modalOptions = {
  presentation: "transparentModal",
  headerShown: false,
} as const;
type Props = PropsWithChildren<ComponentProps<typeof View>>;
export default function Modal({ children, ...props }: Props) {
  const { background, borderColor, color } = useTheme();

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080",
      }}
    >
      {/* Dismiss modal when pressing outside */}
      <Link href={"/"} asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <Animated.View
        entering={FadeInDown}
        {...props}
        style={{
          width: "90%",
          height: "80%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: background.get(),
          borderWidth: 1,
          borderColor: borderColor.get(),
          borderRadius: "2rem",
          ...(props.style as ViewStyle),
        }}
      >
        <Pressable style={{ position: "absolute", top: 16, right: 16 }}>
          <Text onPress={() => router.back()}>
            <MaterialIcons name="close" color={color.get()} size={16} />
          </Text>
        </Pressable>
        {children}
      </Animated.View>
    </Animated.View>
  );
}
