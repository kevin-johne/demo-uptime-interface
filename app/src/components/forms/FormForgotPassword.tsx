import { Stack, TextField, Button } from "@mui/material";

export default function FormForgotPassword() {
  return (
    <form>
      <Stack spacing={2}>
        <TextField fullWidth variant="outlined" label="Email" name="user" />
        <Button fullWidth size="large" variant="contained" type="submit">
          Reset password
        </Button>
      </Stack>
    </form>
  );
}
