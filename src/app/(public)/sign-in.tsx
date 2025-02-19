import { supabase } from "@/src/services/supabase";
import { Button, Input, Text, View } from "tamagui";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useToast } from "react-native-toast-notifications";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) toast.show(error.message);
    setLoading(false);
  }

  async function signInWithDiscord() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: 'https://wthew.github.io/rivalry-hub/' }
    });
    console.log({ data, error });

    setLoading(false);
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
          <Button disabled={loading} onPress={() => signInWithEmail()}>
            <Text>Logar</Text>
          </Button>
        </View>
        <View style={[styles.verticallySpaced]}>
          <Button disabled={loading} onPress={() => signInWithDiscord()}>
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
