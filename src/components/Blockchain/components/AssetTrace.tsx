import React from "react";

import { ExpandMore, Timelapse } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ITrace } from "../TraceabilityView";
import { IconTextButton } from "./Button";
import { ExplorerCard } from "./ExplorerCard";
import { Circle } from "./Circle";

interface ITraceability {
  from: ITrace;
  to: ITrace;
  index: number;
  last: boolean;
  expanded: string | false;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export const AssetTrace: React.FC<ITraceability> = ({
  from,
  to,
  index,
  last,
  expanded,
  handleChange,
}) => {

  const panel = `panel-${index}`
  return (
    <>
      <ExplorerCard
        margin="3px 0 3px 2px"
        width="100%"
        className="cursor-pointer"
        padding="0px !important"
      >
        <Grid container p={2} spacing={2}>
          {/* divider */}
          <Grid item xs={1}>
            <Grid
              container
              direction={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
              height={"100%"}
              pt={1}
              pb={1}
            >
              <Grid item>
                <Circle />
              </Grid>
              <Grid item xs={10}>
                <Box
                  width={"0.8px"}
                  height={"100%"}
                  sx={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }}
                />
              </Grid>
              <Grid item>
                <Circle />
              </Grid>
            </Grid>
          </Grid>
          {/* content */}
          <Grid item xs>
            <Box alignItems="flex-start" height="inherit" width="100%">
              <Typography variant="body2">
                <Typography variant="overline" sx={{ letterSpacing: 0 }}>
                  <b>
                    {from.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </b>
                </Typography>{" "}
                {from.location}
              </Typography>

              <Divider
                variant="fullWidth"
                sx={(theme) => ({
                  color: theme.palette.secondary.main,
                  margin: "4px 0",
                })}
              />

              <Accordion
                expanded={expanded === panel}
                onChange={handleChange(panel)}
                style={{ boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  id={panel}
                >
                  <Grid container direction="row">
                    <Grid item xs>
                      <IconTextButton
                        startIcon={<Timelapse />}
                        size="small"
                        sx={(theme) => ({ color: theme.palette.grey[700] })}
                      >
                        5 days
                      </IconTextButton>
                    </Grid>
                    <Grid item xs="auto">
                      <Typography variant="caption">More Info</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Divider
                variant="fullWidth"
                sx={(theme) => ({
                  color: theme.palette.secondary.main,
                  margin: "4px 0",
                })}
              />

              <Typography variant="body2">
                <Typography variant="overline" sx={{ letterSpacing: 0 }}>
                  <b>
                    {to.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </b>
                </Typography>{" "}
                {to.location}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ExplorerCard>

      {/* Connector */}
      {!last && (
        <Grid container height={70}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ padding: 0, paddingLeft: "22px" }}
          />
          <Grid item xs sx={{ verticalAlign: "middle", paddingLeft: 2 }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              height="100%"
            >
              <Grid item>
                <Typography variant="caption">5 days stay in</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};
