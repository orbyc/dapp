import React from "react";
import { Grid } from "@mui/material";
import { ExplorerHeader } from "./components/HeaderInfo";
import { AirlineStops, Public, Timelapse } from "@mui/icons-material";
import { IconTextButton, SquaredButton } from "./components/Button";
import { AssetTrace } from "./components/AssetTrace";
import { Box } from "@mui/system";

export interface ITrace {
  location: string;
  date: Date;
  properties: string[];
}

interface ITraces {
  traces: ITrace[];
}

export const RenderTraces: React.FC<ITraces> = ({ traces }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid container justifyContent={"space-between"} width="100%">
      {traces.map((trace, index) =>
        index !== traces.length - 1 ? (
          <AssetTrace
            from={trace}
            to={traces[index + 1]}
            index={index}
            last={index === traces.length - 2}
            expanded={expanded}
            handleChange={handleChange}
          />
        ) : (
          <></>
        )
      )}
    </Grid>
  );
};

export const TraceabilityHighlights: React.FC<ITraces> = ({ traces }) => {
  const scales = traces.length;

  return (
    <Grid container justifyContent={"space-between"} marginBottom={2}>
      <Grid item>
        {/* Current Location */}
        <SquaredButton startIcon={<Public />} variant="contained" size="small" color="primary">
          {traces[scales - 1].location}
        </SquaredButton>
      </Grid>
      <Grid item>
        {/* Total time */}
        <IconTextButton startIcon={<Timelapse />} size="small">
          32 days
        </IconTextButton>
      </Grid>
      <Grid item>
        {/* Total scales */}
        <IconTextButton startIcon={<AirlineStops />} size="small">
          {scales} scales
        </IconTextButton>
      </Grid>
    </Grid>
  );
};

export const TraceabilityView: React.FC = () => {
  const traceability: ITrace[] = [
    {
      location: "Frankfurt am Main",
      date: new Date("December 1, 2021"),
      properties: [],
    },
    {
      location: "Bruselas",
      date: new Date("December 9, 2021"),
      properties: [],
    },
    {
      location: "Freetown",
      properties: [],
      date: new Date("December 19, 2021"),
    },
  ];

  return (
    <>
      <ExplorerHeader />
      <Grid container justifyContent={"center"} paddingTop={3}>
        <Box minWidth="300px" maxWidth="350px">
          <TraceabilityHighlights traces={traceability} />
          <RenderTraces traces={traceability} />
        </Box>
      </Grid>
    </>
  );
};
