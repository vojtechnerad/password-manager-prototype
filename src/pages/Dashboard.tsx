import PasswordDetails from "@/components/PasswordDetails";
import PasswordsList from "@/components/PasswordsList";
import Profiles from "@/components/Profiles";
import { Box, Grid } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Grid templateColumns="200px 300px 1fr" height="100%" overflow="auto">
      <Box height="100%" overflow="auto" bg="gray.100">
        <Profiles />
      </Box>
      <Box>
        <PasswordsList />
      </Box>
      <Box>
        <PasswordDetails />
      </Box>
    </Grid>
  );
}
