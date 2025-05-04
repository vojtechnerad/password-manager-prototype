import PasswordDetails from "@/components/PasswordDetails";
import PasswordsList from "@/components/PasswordsList";
import Profiles from "@/components/Profiles";
import { Box, Grid } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Grid templateColumns="200px 200px 1fr">
      <Box>
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
