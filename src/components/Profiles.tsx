import { Box, Separator, Stack, Button, ButtonGroup } from "@chakra-ui/react";
import ProfilePopup from "./ProfilePopup";
import { usePasswordStore } from "@/stores/passwordsStore";
import ProfileMenu from "./ProfileMenu";
import ProfileIcon from "./ProfileIcon";
import { IoAddCircle } from "react-icons/io5";

export default function Profiles() {
  const groups = usePasswordStore((s) => s.groups);
  const { selectedGroupId, setSelectedGroup } = usePasswordStore();

  const getGroupButtonVariant = (groupId: string): "subtle" | "ghost" => {
    return selectedGroupId === groupId ? "subtle" : "ghost";
  };

  const getBtnBg = (groupId: string | null): "gray.200" | "gray.100" => {
    return selectedGroupId === groupId ? "gray.200" : "gray.100";
  };

  const getBtnHoverBg = (groupId: string | null): "gray.300" | "gray.200" => {
    return selectedGroupId === groupId ? "gray.300" : "gray.200";
  };

  return (
    <>
      <Stack padding={4} align="stretch">
        <Button
          justifyContent="start"
          bg={getBtnBg(null)}
          _hover={{ bg: getBtnHoverBg(null) }}
          variant={!selectedGroupId ? "subtle" : "ghost"}
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
                    justifyContent="start"
                    bg={getBtnBg(group.id)}
                    _hover={{ bg: getBtnHoverBg(group.id) }}
                    variant={getGroupButtonVariant(group.id)}
                    onClick={() => setSelectedGroup(group.id)}
                    borderRadius="2xl"
                  >
                    <ProfileIcon iconId={group.iconId} />
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
          button={
            <Button
              variant="ghost"
              _hover={{ bg: "gray.200" }}
              justifyContent="start"
              borderRadius="2xl"
            >
              <IoAddCircle />
              Nový profil
            </Button>
          }
        />
      </Stack>
    </>
  );
}
