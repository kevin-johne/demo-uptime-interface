import { Box, Button, Paper, Typography } from "@mui/material";
import FormForgotPassword from "./components/forms/FormForgotPassword";
import FormLogin from "./components/forms/FormLogin";
import { FormType } from "./types";
import Dashboard from "./components/Dashboard";
import React from "react";
import Page from "./components/Page";
import { useAuth } from "./context/AuthProvider";

export default function App() {
  const { token } = useAuth();
  const [currentForm, setCurrentForm] = React.useState<FormType>("login");

  if (token) {
    return (
      <Page>
        <Dashboard />
      </Page>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(135deg, #266573, #154b58)",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          maxWidth: "700px",
          margin: "0 auto",
          overflow: "auto",
          maxHeight: "80vh",
          p: 15,
          br: 2,
        }}
      >
        <Typography variant="h4" component="h1" mb="3rem">
          Nice to see you again!
          <Typography variant="body2">
            Don't let us <b>down</b> this <b>time</b>.
          </Typography>
        </Typography>
        {currentForm === "login" && <FormLogin setForm={setCurrentForm} />}
        {currentForm === "forgot" && <FormForgotPassword />}
        {currentForm !== "login" && (
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={() => setCurrentForm("login")}
            sx={{
              mt: 2,
            }}
          >
            Back to Login
          </Button>
        )}
      </Paper>
    </Box>
  );
}
