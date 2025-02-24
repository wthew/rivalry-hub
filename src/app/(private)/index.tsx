import BattleCard from "@/src/components/battles/battle-card";
import useData from "@/src/hooks/useData";
import { FlatList, View } from "react-native";
import { H6, XStack, ScrollView } from "tamagui";

export default function TabOneScreen() {
  const { data = [] } = useData("battles", {
    key: "list_battles",
    select: "id, profile_a, profile_b",
  });

  return (
    <ScrollView style={{ paddingTop: 32 }}>
      <H6>Test:</H6>
      <XStack marginBlock="$2">
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
          renderItem={({ item }) => <BattleCard key={item.id} battle={item} />}
        />
      </XStack>
    </ScrollView>
  );
}
