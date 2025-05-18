import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { LuEllipsis } from "react-icons/lu";
import { usePasswordStore } from "@/stores/passwordsStore";
import { toaster } from "./ui/toaster";

type Props = {
  profileId: string;
};

export default function ProfileMenu({ profileId }: Props) {
  const { deleteGroup } = usePasswordStore();

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton variant="ghost" borderRadius="xl">
            <LuEllipsis />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                value="edit-profile"
                disabled
                onClick={() => {
                  toaster.create({
                    title: "Není implementováno",
                    type: "error",
                  });
                }}
              >
                Přejmenovat
              </Menu.Item>
              <Menu.Item
                value="delete-profile"
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
                onClick={() => {
                  deleteGroup(profileId);
                }}
              >
                Smazat...
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}
