import { usePasswordStore } from "@/stores/passwordsStore";
import {
  Box,
  Button,
  Input,
  InputGroup,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export default function PasswordsList() {
  const {
    selectedPasswordId,
    setSelectedPassword,
    passwords,
    searchQuery,
    setSearchQuery,
  } = usePasswordStore();

  return (
    <Stack padding={4}>
      <Box>
        <span>Hesla</span>
        <Button>+</Button>
      </Box>

      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input
          placeholder="Vyhledat..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      <Separator />

      {passwords().map((item) => {
        return (
          <Button
            justifyContent="start"
            onClick={() => {
              setSelectedPassword(item.id);
            }}
            variant={selectedPasswordId === item.id ? "subtle" : "ghost"}
          >
            {item.title}
          </Button>
        );
      })}
    </Stack>
  );
}
