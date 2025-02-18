import useData from "@/src/hooks/useData";
import { Tables } from "@/src/types/supabase";
import { Text, View } from "@tamagui/core";
import React from "react";

type Props = {
  battle: Pick<Tables<"battles">, "user_a" | "user_b" | "winner">;
};

export default function BattleCard({ battle }: Props) {
  const { winner } = battle;

  const user_a = useData("profiles", {
    key: ["user_nick", battle.user_a],
    select: "nick",
    filter: ["id", "eq", battle.user_a],
    limit: 1,
  });

  const user_b = useData("profiles", {
    key: ["user_nick", battle.user_b],
    select: "nick",
    filter: ["id", "eq", battle.user_b],
    limit: 1,
  });

  if (user_a.isLoading || user_b.isLoading) return <Text>Carregando</Text>;

  return (
    <View
      // padding="$2"
      style={{
        // padding: space[2].val,
        // borderRadius: space[2].val,
        borderColor: 'white'
      }}
    >
      <Text>
        Battlecard, {user_a.data?.nick} - {user_b.data?.nick}
      </Text>
    </View>
  );
}
