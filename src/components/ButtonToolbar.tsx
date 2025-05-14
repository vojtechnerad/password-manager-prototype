import { usePasswordStore } from "@/stores/passwordsStore";
import { Box, Button } from "@chakra-ui/react";
import { LuSave } from "react-icons/lu";

type Props = {
  isDataChanged?: boolean;
  reset?: () => void;
  save?: () => void;
};

export default function ButtonToolbar({ isDataChanged, reset, save }: Props) {
  const { selectedPasswordId, setSelectedPassword, deletePassword } =
    usePasswordStore();
  return (
    <Box width="100%" padding={4} paddingBottom={0}>
      <Button
        variant="subtle"
        onClick={() => {
          if (selectedPasswordId) deletePassword(selectedPasswordId);
        }}
      >
        Smazat heslo
      </Button>
      <Button
        variant="outline"
        colorPalette="red"
        onClick={() => setSelectedPassword(null)}
      >
        Zrušit
      </Button>
      <Button disabled={!isDataChanged} onClick={save}>
        <LuSave />
        Potvrdit úpravy
      </Button>
    </Box>
  );
}
