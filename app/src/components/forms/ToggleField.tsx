import { SaveRounded, CloseRounded, EditRounded } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import React from "react";

export default function ToggleField({
  defaultProps,
  textFieldProps,
  value: propValue,
  isLoading,
  onSave,
}: {
  defaultProps: TypographyProps;
  textFieldProps: TextFieldProps;
  value: unknown;
  isLoading?: boolean;
  onSave: (value: unknown, name: string | undefined) => Promise<void>;
}) {
  const [toggled, setToggled] = React.useState(false);
  const [value, setValue] = React.useState(propValue);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;
    try {
      await onSave(value, textFieldProps.name);
      setToggled(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleReset() {
    setValue(propValue);
    setToggled(false);
  }

  return (
    <Box>
      {toggled ? (
        <form onSubmit={handleSubmit}>
          <TextField
            {...textFieldProps}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            disabled={isLoading}
            slotProps={{
              input: {
                endAdornment: (
                  <>
                    {isLoading && <CircularProgress size={20} />}
                    <IconButton
                      type="submit"
                      aria-label="save"
                      disabled={isLoading}
                    >
                      <SaveRounded />
                    </IconButton>
                    <IconButton
                      aria-label="cancel"
                      onClick={handleReset}
                      disabled={isLoading}
                    >
                      <CloseRounded />
                    </IconButton>
                  </>
                ),
              },
            }}
          />
        </form>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography {...defaultProps} />
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => setToggled(true)}
          >
            <EditRounded fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
