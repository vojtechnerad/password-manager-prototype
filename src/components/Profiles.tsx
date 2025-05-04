import { Box, Separator, Stack, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function Profiles() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <Stack padding={4}>
      <Button>Vše</Button>
      <Separator />
      <Box>TODO Profily</Box>
      <Separator />
      <Button>Nový profil</Button>
    </Stack>
  );
}
