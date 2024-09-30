import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth } from "./context/AuthProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(<Main />);

// eslint-disable-next-line react-refresh/only-export-components
function Main() {
  return (
    <StrictMode>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Auth>
            <App />
          </Auth>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
