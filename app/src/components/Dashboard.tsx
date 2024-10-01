import { Paper } from "@mui/material";
import ChecksTable from "./Checks/ChecksTable";

export default function FormUpdateAccount() {
  return (
    <Paper
      elevation={1}
      sx={{
        border: "1px solid",
        borderColor: "grey.300",
        px: 3,
        sx: 12,
        py: 3,
      }}
    >
      <ChecksTable />
    </Paper>
  );
}
