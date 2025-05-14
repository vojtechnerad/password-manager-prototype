import { usePasswordStore } from "@/stores/passwordsStore";
import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { LuEllipsis } from "react-icons/lu";

type Props = {
  passwordId: string;
};

export default function PasswordPopover({ passwordId }: Props) {
  const { deletePassword } = usePasswordStore();

  return (
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
              value="delete-profile"
              color="fg.error"
              _hover={{ bg: "bg.error", color: "fg.error" }}
              onClick={() => {
                deletePassword(passwordId);
              }}
            >
              Smazat...
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
