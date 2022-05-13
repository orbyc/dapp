import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import mapImage from "assets/explorer/map_updated.png";
import { weightConvert } from "utils/weight";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { ExplorerContext } from "../context";

interface HeadingPropertyProps {
  label: string;
  size: string;
}
export function HeadingProperty(props: HeadingPropertyProps) {
  return (
    <Grid item>
      <Grid container direction={"column"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography
          sx={{
            fontSize: 45,
            fontWeight: "bold",
            lineHeight: 0.7,
          }}
        >
          {props.size}
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            lineHeight: 1,
          }}
        >
          {props.label}
        </Typography>
      </Grid>
    </Grid>
  );
}

export const ExplorerHeader: React.FC = () => {
  const { state } = useContext(ExplorerContext);
  const { asset } = state.routes.current;
  const { erc245 } = state.dataSource;

  const [item] = erc245.getAsset(asset);

  const { weight, unit } = weightConvert(item.co2);

  return (
    <Box
      color={"white"}
      sx={{
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: 3,
        backgroundImage: `url(${item.metadata.backImage})`,
        backgroundSize: "cover",
      }}
    >
      <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Typography
          textAlign={"center"}
          sx={{
            marginBottom: 2,
            marginLeft: 4,
            marginRight: 4,
            fontSize: 35,
            lineHeight: 0.7,
          }}
        >
          {item.metadata.heading}
        </Typography>
        <Box
          bgcolor={"white"}
          color={"#0a785a"}
          borderRadius={10}
          minHeight={180}
          maxWidth={500}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          sx={{
            backgroundImage: `url(${mapImage})`,
            backgroundSize: "contain",
          }}
        >
          <Grid container flexGrow={1} justifyContent={"center"} alignItems={"center"}>
            <a
              href="https://goo.gl/maps/kUghHRaHLhXtQkAt8"
              target={"_blank"}
              rel="noreferrer"
            >
              <IconButton aria-label="delete" size="large" color="primary">
                <LocationOnRoundedIcon fontSize="inherit" />
              </IconButton>
            </a>
          </Grid>
          <Grid
            container
            direction="row"
            padding={2}
            justifyContent="space-around"
            alignItems="flex-end"
          >
            {/* TODO: refactor */}
            <HeadingProperty size={`${weight}${unit}`} label="Carbon emission" />
            <HeadingProperty size={"1,230"} label="Km, to deliver" />
            <HeadingProperty size={"12"} label="Countries involved" />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};
