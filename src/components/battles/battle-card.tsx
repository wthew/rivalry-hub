import useRealTimeData from "@/src/hooks/useRealTimeData";
import { supabase } from "@/src/services/supabase";
import { Tables } from "@/src/types/supabase";
import React, { useCallback } from "react";
import { Button, Card, Text, View, XStack, YStack } from "tamagui";

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
      <XStack columnGap="$6" items="center">
        <BattleProfileControl data={profile_a} />
        <YStack items="center">
          <Text>à</Text>
          <Text fontSize="$8" fontWeight="bold">
            x
          </Text>
          <Text>encerrar</Text>
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

  const handleClick = useCallback(async () => {
    const { data, error } = await supabase
      .from("battles_profiles_wins")
      .update({ wins: props.data.wins + 1 })
      .eq("id", props.data.id)
      .select();

    console.log({ data, error });
  }, [props.data.id, props.data.wins]);

  return (
    <YStack position="static" items="center">
      <Text>{wins} pontos</Text>

      <Text fontSize="$8" fontWeight="bold">
        {profile_id.nick}
      </Text>

      <View style={{ width: "100%" }}>
        <Button onPress={handleClick} mt="$2">
          Venceu
        </Button>
      </View>
    </YStack>
  );
}
