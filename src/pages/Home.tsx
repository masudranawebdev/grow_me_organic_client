import { Stack, Box } from "@mui/material";
import Posts from "../components/Posts";
import Departments from "../components/Departments";
import Navbar from "../layout/Navbar";
const HomePage = () => {
  return (
    <Box>
      <Stack>
        <Navbar />
      </Stack>
      <Stack sx={{ my: "50px" }}>
        <Posts />
      </Stack>
      <Stack>
        <Departments />
      </Stack>
    </Box>
  );
};

export default HomePage;
