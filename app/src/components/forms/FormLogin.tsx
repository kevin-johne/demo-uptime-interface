import { EmailRounded } from "@mui/icons-material";
import { Stack, TextField, Button, Link } from "@mui/material";
import PasswordInput from "./PasswordInput";
import { FormType } from "../../types";
import * as ReactQuery from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import React from "react";
import { tokenSchema } from "../../hooks/useToken";
import { useAuth } from "../../context/AuthProvider";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  access_token: tokenSchema,
});

function formToObject(form: FormData) {
  const data: Record<string, unknown> = {};
  form.forEach((value, key) => (data[key] = value));
  return data;
}

type LoginData = z.infer<typeof loginSchema>;
type LoginResponse = z.infer<typeof loginResponseSchema>;

export default function FormLogin({
  setForm,
}: {
  setForm: (form: FormType) => void;
}) {
  const { setToken } = useAuth();

  const { mutateAsync } = ReactQuery.useMutation<
    { data: LoginResponse },
    unknown,
    LoginData
  >({
    mutationFn: async ({ email, password }: LoginData) => {
      return axios.post("/api/v1/auth/login/", {
        email,
        password,
      });
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let tokenResponse;

    try {
      const form = loginSchema.parse(formToObject(formData));
      tokenResponse = await mutateAsync({
        email: form.email,
        password: form.password,
      });
    } catch (error) {
      window.alert("Invalid email or password");
      console.error(error);
      return;
    }

    try {
      const { access_token } = loginResponseSchema.parse(tokenResponse.data);
      setToken(access_token);
    } catch (error) {
      window.alert("Invalid token");
      console.error(error);
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          placeholder="joe@mail.com"
          slotProps={{
            input: {
              endAdornment: <EmailRounded />,
            },
          }}
        />
        <PasswordInput />
        <Button fullWidth size="large" variant="contained" type="submit">
          Log in
        </Button>
      </Stack>
      <p>
        Did you forget your password? Click here to reset it.{" "}
        <Link component="button" onClick={() => setForm("forgot")}>
          Reset password
        </Link>
      </p>
    </form>
  );
}
