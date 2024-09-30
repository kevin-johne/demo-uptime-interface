import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import * as ReactQuery from "@tanstack/react-query";
import ToggleField from "./forms/ToggleField";
import { z } from "zod";
import { Circle } from "@mui/icons-material";

export const checkSchema = z.object({
  pk: z.number(),
  name: z.string(),
  url: z.string(),
  msp_address: z.string(),
  state_is_up: z.boolean(),
  msp_uptime_sla: z.coerce.number(),
});

export type CheckData = z.infer<typeof checkSchema>;

export default function Check({
  name,
  pk,
  msp_address,
  msp_uptime_sla,
  state_is_up,
  isLoading,
}: CheckData & { isLoading?: boolean }) {
  const queryClient = ReactQuery.useQueryClient();
  const mutateCheck = ReactQuery.useMutation<
    { data: { token: string } },
    unknown,
    Partial<CheckData>
  >({
    mutationFn: async (data) => {
      return axios.patch(`/api/v1/checks/${pk}/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["checks"]);
    },
  });

  async function handleSave(value: unknown, name: string | undefined) {
    if (name === undefined) return;
    const data = checkSchema.partial().parse({ [name]: value });
    await mutateCheck.mutateAsync(data);
    return;
  }

  return (
    <Grid container rowSpacing={1} alignItems={"center"}>
      <Grid item xs={12} sm={6} md={3}>
        <ToggleField
          value={name}
          onSave={(value, name) => handleSave(value, name)}
          defaultProps={{ children: name }}
          textFieldProps={{
            size: "small",
            name: "name",
            variant: "outlined",
            fullWidth: true,
          }}
          isLoading={mutateCheck.isLoading || isLoading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="body2">{msp_address}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="body2">{msp_uptime_sla * 100}%</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} alignSelf={"center"}>
        <Circle sx={{ color: state_is_up ? "green" : "red" }} />
      </Grid>
    </Grid>
  );
}
