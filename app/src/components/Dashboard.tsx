import { Card, Typography } from "@mui/material";
import ChecksTable from "./Checks/ChecksTable";

export default function FormUpdateAccount() {
  return (
    <>
      <Typography
        variant="h3"
        component={"h1"}
        mb={5}
        borderBottom={1}
        borderColor={"grey.300"}
      >
        Dashboard
      </Typography>
      <Card
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
      </Card>
    </>
  );
}
