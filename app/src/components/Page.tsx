import { Box } from "@mui/material";
import Navigation from "./Navigation";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "250px 1fr",
      }}
    >
      <Navigation />
      <Box
        sx={{
          p: 3,
          margin: "0 auto",
          width: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
