import React from "react";
import { z } from "zod";

export const tokenSchema = z.string().length(40);

export default function useToken(): [
  string | null,
  (token: string | null) => void
] {
  const [token, setInternalToken] = React.useState<string | null>(() => {
    const token = sessionStorage.getItem("access_token");
    try {
      tokenSchema.parse(token);
      return token;
    } catch {
      sessionStorage.removeItem("access_token");
      return null;
    }
  });

  function setToken(token: string | null) {
    if (token === null) {
      sessionStorage.removeItem("access_token");
      setInternalToken(token);
      return;
    }

    try {
      tokenSchema.parse(token);
      sessionStorage.setItem("access_token", token);
      setInternalToken(token);
    } catch {
      console.error("Invalid token");
    }
  }

  return [token, setToken];
}
