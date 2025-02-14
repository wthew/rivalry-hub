import BattleCard from "@/src/components/battles/battle-card";
import { supabase } from "@/src/services/supabase";
import { Tables } from "@/src/types/supabase.types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "tamagui";

type Battles = Pick<Tables<"battles">, "id" | "winner" | "user_a" | "user_b">[];
export default function TabOneScreen() {
  const [battles, setBattles] = useState<Battles>([]);

  const t = (payload: any) => {
    const battle = payload.new as Battles[number];

    setBattles((old) => {
      const next = [...old].map((old) => (old.id === battle.id ? old : old));
      const exists = next.find(({ id }) => id === battle.id);

      if (exists) return next;

      return next;
    });
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("battles")
        .select("id,winner,user_a,user_b");
      return data || [];
    };

    fetch().then((battles) => setBattles(battles));

    const channel = supabase.channel("battles");

    channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "battles" },
      (a) => {}
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Minhas Batalhas: ({process.env.EXPO_PUBLIC_SUPABASE_URL})
      </Text>
      <View style={styles.separator} />
      <FlatList
        data={battles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <BattleCard key={item.id} battle={item} />;
        }}
      />
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
});
