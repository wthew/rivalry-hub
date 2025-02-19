import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { defaultConfig } from "@tamagui/config/v4";
import { modalOptions } from "../components/modal/index";

import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { Pressable } from "react-native";
import { Text, View, XStack } from "tamagui";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "react-native-toast-notifications";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../services/supabase";
import SessionContextProvider from "../contexts/session";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createTamagui(defaultConfig);

SystemUI.setBackgroundColorAsync(DarkTheme.colors.background);
NavigationBar.setBackgroundColorAsync(DarkTheme.colors.card);

type Conf = typeof config;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="dark">
        <ThemeProvider value={DarkTheme}>
          <ToastProvider>
            <SessionContextProvider>
              <StatusBar backgroundColor={DarkTheme.colors.card} />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="(private)"
                  options={{
                    contentStyle: { backgroundColor: DarkTheme.colors.card },
                    headerShown: true,
                    headerStyle: { borderWidth: 0 } as any,
                    headerTitle: () => (
                      <Link href="/" asChild>
                        <Pressable>
                          {({ pressed }) => (
                            <XStack opacity={pressed ? 0.5 : 1} gap={8}>
                              <MaterialCommunityIcons
                                name="sword-cross"
                                size={24}
                                color={DarkTheme.colors.text}
                              />
                              <Text fontSize="$8">Rivalry Hub</Text>
                            </XStack>
                          )}
                        </Pressable>
                      </Link>
                    ),
                  }}
                />
                <Stack.Screen name="(public)" />
                <Stack.Screen name="settings" options={{ ...modalOptions }} />
              </Stack>
            </SessionContextProvider>
          </ToastProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
