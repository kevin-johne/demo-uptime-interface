import { Box, Button, Stack, Typography } from "@mui/material";
import { PersonOutlineRounded } from "@mui/icons-material";
import { useAuth } from "../context/AuthProvider";

export default function Navigation() {
  const { setToken } = useAuth();
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 2,
        backgroundColor: "grey.900",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mt: 2, mb: 6, color: "white", textAlign: "center" }}
      >
        Uptime Assessment
      </Typography>
      <Stack>
        <Button fullWidth variant="outlined" sx={{ mr: 2 }}>
          Dashboard
        </Button>
      </Stack>
      <Button
        startIcon={<PersonOutlineRounded />}
        variant="contained"
        onClick={() => setToken(null)}
        sx={{
          mt: "auto",
          mb: 2,
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
