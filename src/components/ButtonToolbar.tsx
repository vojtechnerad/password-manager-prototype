import { usePasswordStore } from "@/stores/passwordsStore";
import { Button, Flex } from "@chakra-ui/react";
import { LuSave } from "react-icons/lu";
import { toaster } from "./ui/toaster";

type Props = {
  isDataChanged?: boolean;
  reset?: () => void;
  save?: () => void;
};

export default function ButtonToolbar({ isDataChanged, save }: Props) {
  const { selectedPasswordId, setSelectedPassword, deletePassword } =
    usePasswordStore();
  return (
    <Flex
      width="100%"
      padding={4}
      paddingBottom={0}
      justifyContent="end"
      gap={2}
    >
      <Button
        variant="subtle"
        borderRadius="xl"
        onClick={() => {
          if (selectedPasswordId) {
            deletePassword(selectedPasswordId);
            toaster.create({
              title: "Záznam úspěšně smazán",
              type: "success",
            });
          }
        }}
      >
        Smazat heslo
      </Button>

      <Button
        variant="outline"
        borderRadius="xl"
        colorPalette="red"
        onClick={() => setSelectedPassword(null)}
      >
        Zrušit
      </Button>
      <Button borderRadius="xl" disabled={!isDataChanged} onClick={save}>
        <LuSave />
        Potvrdit úpravy
      </Button>
    </Flex>
  );
}
