import { Box, Button } from "@mui/material";
import { PersonOutlineRounded } from "@mui/icons-material";
import { useAuth } from "../AuthProvider";

export default function Header() {
  const { setToken } = useAuth();
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        px: 6,
        backgroundColor: "primary.light",
      }}
    >
      <h1>Uptime Assessment</h1>
      <Button
        startIcon={<PersonOutlineRounded />}
        variant="contained"
        onClick={() => setToken(null)}
        sx={{
          ml: "auto",
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
