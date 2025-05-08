import { Box, Separator, Stack, Button } from "@chakra-ui/react";
import { useState } from "react";
import NewProfilePopup from "./NewProfilePopup";
import { usePasswordStore } from "@/stores/passwordsStore";

export default function Profiles() {
  const [profileList, setProfileList] = useState<unknown[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isProfilePopupOpened, setIsProfilePopupOpened] =
    useState<boolean>(false);

  const groups = usePasswordStore((s) => s.groups);
  const { addGroup } = usePasswordStore();

  const handleAddProfile = () => {
    addGroup("aaaaaaaaaaaa");
  };

  return (
    <>
      <Stack padding={4} align="stretch">
        <Button>Vše</Button>
        <Separator />
        <Box maxH="100%" overflow="auto" width="100%">
          <Stack>
            {groups.map((group) => {
              return <Button>{group.name}</Button>;
            })}
          </Stack>
        </Box>
        <Separator />
        <Button
          onClick={(prev) => {
            handleAddProfile();
          }}
        >
          Nový profil
        </Button>
      </Stack>
      <NewProfilePopup isOpened={isProfilePopupOpened} />
    </>
  );
}
