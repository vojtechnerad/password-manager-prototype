import { Box, Button } from "@chakra-ui/react";

type Props = {
  isDataChanged: boolean;
};

export default function ButtonToolbar({ isDataChanged }: Props) {
  return (
    <Box width="100%">
      <Button>Smazat heslo</Button>
      <Button variant="outline">Zrušit</Button>
      <Button disabled={!isDataChanged}>Potvrdit úpravy</Button>
    </Box>
  );
}
