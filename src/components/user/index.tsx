import { Link } from "expo-router";
import React, { PropsWithChildren } from "react";
import { Card, Circle, SizableText, View, XStack, YStack } from "tamagui";

type UserPageContext = { id: string }
const UserPageContext = React.createContext({} as UserPageContext);
export const useUserPageContext = () => React.useContext(UserPageContext)
export default function UserPage(props: PropsWithChildren<{ id: string }>) {

  return (
    <UserPageContext.Provider value={{ id: props.id }}>
      <XStack flexWrap="wrap" gap="$8" self="stretch" justify="center">
        <Card bordered rounded="$4">
          <Card.Header padded>
            <XStack>
              <View style={{ alignItems: "center" }}>
                <Circle size={64} bordered borderWidth={2}>
                  <SizableText>AVATAR</SizableText>
                </Circle>
              </View>

              <YStack mx="$5">
                <Info title="Nick" label="thw" />
                <Info title="Clan" label="Dark Brotherhood" />
                <Info title="Partidas ganhas" label="8" />
                <Info title="Partidas perdidas" label="0" />
              </YStack>
            </XStack>
          </Card.Header>
        </Card>
        <Card bordered rounded="$4" padded>
          <YStack>
            <Info title="Titulo" label="Assasino" />
            <Info title="K/D" label="1.3" />
            <Info title="Maior Rival" label="muder" />
            <Info title="Posição no clan" label="2" />
          </YStack>
        </Card>

        <Card bordered padded>
          <SizableText fontSize="$4" fontWeight="bold">
            Historico de batalhas:
          </SizableText>
          <YStack>
            <SizableText text="center">1</SizableText>
            <SizableText text="center">1</SizableText>
            <Link href="/">
              <SizableText>Ver todas...</SizableText>
            </Link>
          </YStack>
        </Card>

        {props.children}
      </XStack>
    </UserPageContext.Provider>
  );
}

function Info(props: { title: string; label: string }) {
  return (
    <XStack gap="$4" justify="space-between">
      <SizableText fontWeight="bold">{props.title}:</SizableText>
      <SizableText>{props.label}</SizableText>
    </XStack>
  );
}
