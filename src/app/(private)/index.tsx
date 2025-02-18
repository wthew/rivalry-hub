import BattleCard from "@/src/components/battles/battle-card";
import useRealTimeData from "@/src/hooks/useRealTimeData";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "tamagui";

export default function TabOneScreen() {
  const { data: battles = [] } = useRealTimeData("battles", {
    key: "list_battles",
    select: "id, user_a, user_b, winner",
    cb: (payload, old = []) => {
      const item = payload.new as (typeof old)[number];

      return old.find(({ id }) => id === item.id)
        ? old.map((old) => (old.id === item.id ? item : old))
        : [item, ...old];
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Minhas Batalhas: ({process.env.EXPO_PUBLIC_SUPABASE_URL})
      </Text>
      <View style={styles.separator} />
      <FlatList
        data={battles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BattleCard key={item.id} battle={item} />}
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
