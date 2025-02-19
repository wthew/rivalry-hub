import BattleCard from "@/src/components/battles/battle-card";
import useRealTimeData from "@/src/hooks/useRealTimeData";
import { FlatList, View } from "react-native";
import { H6, XStack, ScrollView } from "tamagui";

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
    <ScrollView style={{ paddingTop: 32 }}>
      <H6>Ultimas Batalhas:</H6>
      <XStack marginBlock="$2">
        <FlatList
          horizontal
          data={battles}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
          renderItem={({ item }) => <BattleCard key={item.id} battle={item} />}
        />
      </XStack>
    </ScrollView>
  );
}
