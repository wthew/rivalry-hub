import useRealTimeData from "@/src/hooks/useRealTimeData";
import { supabase } from "@/src/services/supabase";
import { Tables } from "@/src/types/supabase";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Card, Text, useTheme, View, XStack, YStack } from "tamagui";

type BattleCardProps = {
  battle: Pick<Tables<"battles">, "id" | "profile_a" | "profile_b">;
};

export default function BattleCard({ battle }: BattleCardProps) {
  const { data = [], isLoading } = useRealTimeData("battles_profiles_wins", {
    key: battle.id,
    select: "id, profile_id(id, nick), wins",
    filter: ["battle_id", "eq", battle.id],
    cb: (payload, old = []) => {
      const { id, wins } = payload.new as (typeof old)[number];
      return old.map((old) => (old.id === id ? { ...old, wins } : old));
    },
  });

  if (isLoading) return <Text>Carregando</Text>;
  if (data.length !== 2) return <Text>Erro</Text>;
  const [profile_a, profile_b] = data;

  return (
    <Card padded bordered>
      <XStack columnGap="$4" items="center">
        <BattleProfileControl data={profile_a} />
        <YStack items="center" justify="center">
          <Text fontSize="$8" fontWeight="bold">
            x
          </Text>
        </YStack>
        <BattleProfileControl data={profile_b} />
      </XStack>
    </Card>
  );
}

type BattleProfileControlProps = {
  data: Pick<Tables<"battles_profiles_wins">, "id" | "wins"> & {
    profile_id: Pick<Tables<"profiles">, "nick">;
  };
};
function BattleProfileControl(props: BattleProfileControlProps) {
  const { profile_id, wins } = props.data;

  const { color } = useTheme();

  const handleClick = useCallback(async (inc: number) => {
    const { error } = await supabase
      .from("battles_profiles_wins")
      .update({ wins: props.data.wins + inc })
      .eq("id", props.data.id);

    if (error) {
      // TODO
    }
  }, [props.data.id, props.data.wins]);

  return (
    <YStack position="static" items="center">
      <Text>{wins} pontos</Text>

      <Text fontSize="$8" fontWeight="bold">
        {profile_id.nick}
      </Text>

      <View style={{ flex: 1, flexDirection: 'row', marginBottom: -8, marginTop: 4 }}>
        <TouchableOpacity onPress={() => handleClick(1)}>
          <Ionicons name="caret-up-circle-sharp" size={24} color={color.val} />
        </TouchableOpacity>
        <View mx="$4" />
        <TouchableOpacity onPress={() => handleClick(-1)}>
          <Ionicons name="caret-down-circle-sharp" size={24} color={color.val} />
        </TouchableOpacity>
      </View>
    </YStack>
  );
}
