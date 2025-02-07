import { Link } from "expo-router";
import { ComponentProps, PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useTheme } from "tamagui";

export const modalOptions = { presentation: "transparentModal", headerShown: false } as const
type Props = PropsWithChildren<ComponentProps<typeof View>>;
export default function Modal({ children, ...props }: Props) {
    const { background, borderColor } = useTheme();

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
      <Link href={"../"} asChild>
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
        {children}
      </Animated.View>
    </Animated.View>
  );
}
