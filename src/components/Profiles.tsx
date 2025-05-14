import { Box, Separator, Stack, Button } from "@chakra-ui/react";
import NewProfilePopup from "./NewProfilePopup";
import { usePasswordStore } from "@/stores/passwordsStore";

export default function Profiles() {
  const groups = usePasswordStore((s) => s.groups);
  const { selectedGroupId, setSelectedGroup } = usePasswordStore();

  const getGroupButtonVariant = (groupId: string): "solid" | "ghost" => {
    return selectedGroupId === groupId ? "solid" : "ghost";
  };

  return (
    <>
      <Stack padding={4} align="stretch">
        <Button
          variant={!selectedGroupId ? "solid" : "ghost"}
          onClick={() => setSelectedGroup(null)}
          borderRadius="2xl"
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
                  borderRadius="2xl"
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
