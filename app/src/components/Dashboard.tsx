import { AddRounded } from "@mui/icons-material";
import { Button, Grid, Hidden, Paper, Stack, Typography } from "@mui/material";
import * as ReactQuery from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import Check, { checkSchema } from "./Check";

const checksSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(checkSchema),
});

export type ChecksData = z.infer<typeof checksSchema>;

export default function FormUpdateAccount() {
  const uptimeChecks = ReactQuery.useQuery<ChecksData>({
    queryKey: ["checks"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/checks/");
      return checksSchema.parse(response.data);
    },
  });

  return (
    <Paper
      elevation={1}
      sx={{
        border: "1px solid",
        borderColor: "grey.300",
        px: 3,
        py: 2,
      }}
    >
      {uptimeChecks && (
        <div>
          <Typography variant="h6" mb={5}>
            Checks{" "}
            {uptimeChecks.isLoading && (
              <Typography variant="caption">Loading...</Typography>
            )}
          </Typography>
          {uptimeChecks.data &&
            (uptimeChecks.data.results.length > 0 ? (
              <>
                <Hidden mdDown>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={12} sm={6} md={3}>
                      Name
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      Address
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      Uptime
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      Status
                    </Grid>
                  </Grid>
                </Hidden>
                <Stack spacing={2}>
                  {uptimeChecks.data.results.map((check) => (
                    <Check
                      isLoading={uptimeChecks.isLoading}
                      key={check.pk}
                      {...check}
                    />
                  ))}
                </Stack>
              </>
            ) : (
              <>
                <Typography>No Uptime checks found </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddRounded />}
                  component="a"
                  href="https://uptime.com"
                  target="_blank"
                >
                  Add one
                </Button>
              </>
            ))}
        </div>
      )}
    </Paper>
  );
}
