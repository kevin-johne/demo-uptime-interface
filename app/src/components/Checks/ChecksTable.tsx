import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AddRounded, Circle } from "@mui/icons-material";
import ToggleField from "../forms/ToggleField";
import * as ReactQuery from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

const checkSchema = z.object({
  pk: z.number(),
  name: z.string(),
  url: z.string(),
  msp_address: z.string(),
  state_is_up: z.boolean(),
  msp_uptime_sla: z.coerce.number(),
});

const checksSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(checkSchema),
});

export type ChecksData = z.infer<typeof checksSchema>;
export type CheckData = z.infer<typeof checkSchema>;

export default function ChecksTable() {
  const uptimeChecks = ReactQuery.useQuery<ChecksData>({
    queryKey: ["checks"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/checks/");
      return checksSchema.parse(response.data);
    },
  });

  const queryClient = ReactQuery.useQueryClient();
  const mutateCheck = ReactQuery.useMutation<
    { data: { token: string } },
    unknown,
    { data: Partial<CheckData>; pk: CheckData["pk"] }
  >({
    mutationFn: async ({ data, pk }) => {
      return axios.patch(`/api/v1/checks/${pk}/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["checks"]);
    },
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ value: name, row }) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <ToggleField
            value={name}
            onSave={(value, name) => handleSave(value, name, row.pk)}
            defaultProps={{ children: name }}
            textFieldProps={{
              size: "small",
              name: "name",
              variant: "outlined",
              fullWidth: true,
            }}
            isLoading={mutateCheck.isLoading}
          />
        </Box>
      ),
    },
    { field: "msp_address", headerName: "Address", flex: 1 },
    { field: "msp_uptime_sla", headerName: "Uptime", flex: 1 },
    {
      field: "state_is_up",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value: state_is_up }) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Circle sx={{ color: state_is_up ? "green" : "red" }} />
        </Box>
      ),
    },
  ];

  async function handleSave(
    value: unknown,
    name: string | undefined,
    pk: CheckData["pk"]
  ) {
    if (name === undefined) return;
    const data = checkSchema.partial().parse({ [name]: value });
    await mutateCheck.mutateAsync({ data, pk });
    return;
  }

  return (
    <div>
      <Typography variant="h6" mb={5}>
        Checks{" "}
        {uptimeChecks.isLoading && (
          <Typography variant="caption">Loading...</Typography>
        )}
      </Typography>
      <DataGrid
        loading={uptimeChecks.isLoading}
        autoHeight
        columns={columns}
        rows={uptimeChecks?.data?.results}
        getRowId={(data) => data.pk}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: () => (
            <>
              <Typography>No Uptime checks found </Typography>
              <Button
                variant="contained"
                startIcon={<AddRounded />}
                component="a"
                href="https://uptime.com/dashboard/"
                target="_blank"
              >
                Add one
              </Button>
            </>
          ),
        }}
      />
    </div>
  );
}
