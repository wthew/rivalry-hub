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
import { Text } from "tamagui";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "react-native-toast-notifications";

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

function RootLayoutNav() {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <ThemeProvider value={DarkTheme}>
        <ToastProvider>
          <StatusBar backgroundColor={DarkTheme.colors.card} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(private)"
              options={{
                headerShown: true,
                headerLeft: ({}) => <Text style={{ margin: 16 }}>Icone</Text>,
                headerTitle: () => (
                  <Link href="/" asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <Text
                          fontSize="$9"
                          style={{ opacity: pressed ? 0.5 : 1 }}
                        >
                          Rivalry {process.env.SUPABASE_URL}
                        </Text>
                      )}
                    </Pressable>
                  </Link>
                ),
                headerRight: ({ tintColor }) => (
                  <Link href="/modal" asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="info-circle"
                          size={25}
                          color={tintColor}
                          style={{
                            marginRight: 15,
                            opacity: pressed ? 0.5 : 1,
                          }}
                        />
                      )}
                    </Pressable>
                  </Link>
                ),
              }}
            />
            <Stack.Screen name="(public)" />
            <Stack.Screen name="modal" options={{ ...modalOptions }} />
          </Stack>
        </ToastProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
