import { Card, Circle, SizableText, View, XStack, YStack } from "tamagui";

export default function UserPage(props: { id: string }) {
  return (
    <View>
      <Card bordered rounded="$4">
        <View position="absolute" width="100%"></View>
        <Card.Header padded>
          <XStack flexWrap="wrap">
            <View style={{ alignItems: "center" }}>
              <Circle size={96} bordered borderWidth={2}>
                <SizableText>AVATAR</SizableText>
              </Circle>
            </View>

            <YStack width="auto" mx="$5">
              <SizableText fontWeight="bold">Nick:</SizableText>
              <SizableText ml="$4">thw</SizableText>

              <SizableText fontWeight="bold">Clan:</SizableText>
              <SizableText ml="$4">Dark brotherhood</SizableText>
            </YStack>
          </XStack>
        </Card.Header>
      </Card>
    </View>
  );
}
