import useData from "@/src/hooks/useData";
import { Tables } from "@/src/types/supabase";
import { Text, View } from "tamagui";

type Props = {
  battle: Tables<"battles">;
};
export default function BattleCard({ battle }: Props) {
  const { id, created_at, created_by, winner } = battle;

  const { data: user_a, isLoading: loadingUserA } = useData("profiles", {
    key: "user_a",
    select: "nick",
    filter: ["id", "eq", battle.user_a],
    limit: 1
  });

  const { data: user_b, isLoading: loadingUserB } = useData("profiles", {
    key: "user_b",
    select: "nick",
    filter: ["id", "eq", battle.user_b],
    limit: 1
  });

  return (
    <View>
      <Text>Battlecard, {user_a?.nick} - {user_b?.nick}</Text>
    </View>
  );
}
