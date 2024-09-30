import { Box } from "@mui/material";
import Header from "./Header";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          p: 3,
          margin: "0 auto",
          maxWidth: 1400,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
