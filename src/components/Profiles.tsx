import { Box, Separator, Stack, Button } from "@chakra-ui/react";
import { useState } from "react";
import NewProfilePopup from "./NewProfilePopup";
import { usePasswordStore } from "@/stores/passwordsStore";

export default function Profiles() {
  const [profileList, setProfileList] = useState<unknown[]>([]);
  const [isProfilePopupOpened, setIsProfilePopupOpened] =
    useState<boolean>(false);

  const groups = usePasswordStore((s) => s.groups);
  const { addGroup, selectedGroupId, setSelectedGroup } = usePasswordStore();

  const handleAddProfile = () => {
    addGroup("aaaaaaaaaaaa");
  };

  const getGroupButtonVariant = (groupId: string): "solid" | "ghost" => {
    return selectedGroupId === groupId ? "solid" : "ghost";
  };

  return (
    <>
      <Stack padding={4} align="stretch">
        <Button
          variant={!selectedGroupId ? "solid" : "ghost"}
          onClick={() => setSelectedGroup(null)}
        >
          Vše
        </Button>
        <Separator />
        <Box maxH="100%" overflow="auto" width="100%">
          <Stack>
            {groups.map((group) => {
              return (
                <Button
                  variant={getGroupButtonVariant(group.id)}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  {group.name}
                </Button>
              );
            })}
          </Stack>
        </Box>
        <Separator />
        <NewProfilePopup />
      </Stack>
    </>
  );
}
