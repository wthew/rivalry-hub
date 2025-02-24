import { Redirect } from "expo-router";
import { Button, Card, Form, Input, Label, XStack, YStack } from "tamagui";
import React from "react";
import { useSession } from "@/src/contexts/session";
import UserPage, { useUserPageContext } from "@/src/components/user";

export default function ModalPage() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <YStack style={{ padding: 32, paddingLeft: 0 }}>
      <UserPage id={session.user.id}>
        <UserForm />
      </UserPage>
    </YStack>
  );
}

function UserForm() {
  const { id } = useUserPageContext();

  return (
    <Card padded bordered>
      <Form>
        <XStack gap="$4">
          <YStack>
            <XStack gap="$4">
              <Label>Test</Label>
              <Input width="$16" borderWidth={2} />
            </XStack>
          </YStack>
          <YStack gap="$4">
            <Button>Subir Avatar</Button>
            <Form.Trigger asChild>
              <Button>Salvar</Button>
            </Form.Trigger>
          </YStack>
        </XStack>
      </Form>
    </Card>
  );
}
