import { supabase } from "@/src/services/supabase";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "tamagui";

export default function TabOneScreen() {
  const [battles, setBattles] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("battles")
        .select("id,winner,user_a(id,nick),user_b(id,nick)");

      console.log({ data, error });
      return data || [];
    };

    fetch().then((battles) => setBattles(battles));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Batalhas: ({battles.length})</Text>
      <View style={styles.separator} />
      <FlatList
        data={battles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ borderWidth: 1, borderColor: '#fff', display: 'flex', flexDirection: 'row', gap: 8 }}>
              <Text>{item.user_a.nick}</Text>
              <Text>{item.user_b.nick}</Text>
            </View>
          );
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
