import { supabase } from "@/src/services/supabase";
import { Button, Input, Text, View } from "tamagui";
import { Platform, StyleSheet } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

console.log({ redirectTo });
const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  function withLoad<T>(cb: () => Promise<T>) {
    return () => {
      setLoading(true);
      cb().finally(() => setLoading(false));
    };
  }

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) toast.show(error.message);
  }

  async function signInWithDiscord() {
    if (Platform.OS !== "web") {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });
      // if (error) throw error;

      const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? "",
        redirectTo
      );

      if (res.type === "success") {
        const { url } = res;
        await createSessionFromUrl(url);
      }
    } else await supabase.auth.signInWithOAuth({ provider: "discord" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Link href="/sign-up">
            <Text>Nao possui conta ainda?</Text>
          </Link>
        </View>
        <View style={[styles.verticallySpaced]}>
          <Button disabled={loading} onPress={withLoad(signInWithEmail)}>
            <Text>Logar</Text>
          </Button>
        </View>
        <View style={[styles.verticallySpaced]}>
          <Button disabled={loading} onPress={withLoad(signInWithDiscord)}>
            <Text>Logar com discord</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
