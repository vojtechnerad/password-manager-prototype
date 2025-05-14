import { usePasswordStore } from "@/stores/passwordsStore";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuPlus, LuSearch } from "react-icons/lu";
import PasswordPopover from "./PasswordPopover";

export default function PasswordsList() {
  const {
    selectedPasswordId,
    selectedGroupId,
    setSelectedPassword,
    passwords,
    setSearchQuery,
    addPassword,
  } = usePasswordStore();

  return (
    <Stack padding={4}>
      <Flex>
        <Box flex={1}>
          <Text>Hesla</Text>
        </Box>
        <IconButton
          variant="ghost"
          borderRadius="xl"
          onClick={() => {
            const pswId = addPassword({
              groupId: selectedGroupId,
              password: "",
              title: "New password",
              username: "",
            });

            setSelectedPassword(pswId);
          }}
        >
          <LuPlus />
        </IconButton>
      </Flex>

      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input
          placeholder="Vyhledat..."
          onChange={(e) => setSearchQuery(e.target.value)}
          borderRadius="xl"
        />
      </InputGroup>

      <Separator />

      {passwords().map((item) => {
        return (
          <ButtonGroup>
            <Button
              flex={1}
              justifyContent="start"
              borderRadius="xl"
              onClick={() => {
                setSelectedPassword(item.id);
              }}
              variant={selectedPasswordId === item.id ? "subtle" : "ghost"}
            >
              {item.title}
            </Button>
            <PasswordPopover passwordId={item.id} />
          </ButtonGroup>
        );
      })}
    </Stack>
  );
}
