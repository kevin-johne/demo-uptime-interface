import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import * as ReactQuery from "@tanstack/react-query";
import ToggleField from "../forms/ToggleField";
import { z } from "zod";
import { Circle } from "@mui/icons-material";

export default function Check({
  name,
  pk,
  msp_address,
  msp_uptime_sla,
  state_is_up,
  isLoading,
}: CheckData & { isLoading?: boolean }) {
  return (
    <Grid container rowSpacing={1} alignItems={"center"}>
      <Grid item xs={12} sm={6} md={3}></Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="body2">{msp_address}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="body2">{msp_uptime_sla * 100}%</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} alignSelf={"center"}></Grid>
    </Grid>
  );
}
