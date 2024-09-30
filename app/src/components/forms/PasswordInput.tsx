import { InputAdornment, IconButton, TextField } from "@mui/material";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { useState } from "react";

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Password"
      name="password"
      type={showPassword ? "text" : "password"}
      placeholder="*****"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                size="small"
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOffRounded />
                ) : (
                  <VisibilityRounded />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
