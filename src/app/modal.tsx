import { Link } from "expo-router";
import { Text } from "tamagui";
import Modal from "../components/modal/index";

export default function ModalPage() {
  return (
    <Modal>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Modal Screen</Text>
      <Link href="../">
        <Text>← Go back</Text>
      </Link>
    </Modal>
  );
}
