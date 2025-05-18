import { Box, Separator, Stack, Button, ButtonGroup } from "@chakra-ui/react";
import ProfilePopup from "./ProfilePopup";
import { usePasswordStore } from "@/stores/passwordsStore";
import ProfileMenu from "./ProfileMenu";

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
                <ButtonGroup>
                  <Button
                    flex={1}
                    variant={getGroupButtonVariant(group.id)}
                    onClick={() => setSelectedGroup(group.id)}
                    borderRadius="2xl"
                  >
                    {group.name}
                  </Button>
                  <ProfileMenu profileId={group.id} />
                </ButtonGroup>
              );
            })}
          </Stack>
        </Box>
        <Separator />
        <ProfilePopup
          mode="create"
          button={<Button borderRadius="2xl">Nový profil</Button>}
        />
      </Stack>
    </>
  );
}
