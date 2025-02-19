import useData from "@/src/hooks/useData";
import { Tables } from "@/src/types/supabase";
import { Text } from "@tamagui/core";
import React from "react";
import { Card, H5, Paragraph } from "tamagui";

type Props = {
  battle: Pick<Tables<"battles">, "id" | "user_a" | "user_b" | "winner">;
};

export default function BattleCard({ battle }: Props) {
  const { data: user_a } = useData("profiles", {
    key: ["user_nick", battle.user_a],
    select: "nick",
    filter: ["id", "eq", battle.user_a],
    limit: 1,
  });

  const { data: user_b } = useData("profiles", {
    key: ["user_nick", battle.user_b],
    select: "nick",
    filter: ["id", "eq", battle.user_b],
    limit: 1,
  });

  if (!user_a || !user_b) return <Text>Carregando</Text>;

  const winner = battle.winner
    ? battle.winner === battle.user_a
      ? user_a.nick
      : battle.winner === battle.user_b
      ? user_b.nick
      : null
    : null;

  return (
    <Card elevate bordered>
      <Card.Header>
        <Paragraph opacity={0.25}>{battle.id}</Paragraph>
        <H5>
          {user_a.nick} x {user_b.nick}
        </H5>
        <Paragraph marginBlockStart="$3">
          {winner ? `Winner: ${winner}` : "Ainda sem resultado"}
        </Paragraph>
      </Card.Header>
    </Card>
  );
}
