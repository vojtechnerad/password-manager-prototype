import { Box, Button, Input, InputGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";

export default function PasswordsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<DataType | null>(null);

  interface DataType {
    key: React.Key;
    userName: string;
    password: string;
  }

  const data: DataType[] = [
    {
      key: "1",
      userName: "test",
      password: "aaaa",
    },
    {
      key: "2",
      userName: "test",
      password: "aaaa",
    },
    {
      key: "3",
      userName: "test",
      password: "aaaa",
    },
  ];

  return (
    <Stack>
      <Box>
        <span>Hesla</span>
        <Button>+</Button>
      </Box>

      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input placeholder="Vyhledat..." />
      </InputGroup>

      {data.map((item, index) => {
        return (
          <Button
            justifyContent="start"
            onClick={() => {
              setSelectedEntry(item);
            }}
            variant={selectedEntry?.key === item.key ? "subtle" : "ghost"}
          >
            {item.userName}
          </Button>
        );
      })}
    </Stack>
  );
}
