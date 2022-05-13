import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded";
import { Button } from "./Button";
import { useContext } from "react";
import { ExplorerContext } from "../context";

export function AssetOffer() {
  const { state } = useContext(ExplorerContext);
  const { asset: assetId } = state.routes.current;
  const { erc245 } = state.dataSource;

  const [asset] = erc245.getAsset(assetId);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      p={2}
      spacing={2}
    >
      <Grid item>
        <Box
          width={100}
          minHeight={100}
          borderRadius={5}
          sx={{ backgroundImage: `url(${asset.metadata.image})`, backgroundSize: "cover" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          alignItems="flex-start"
          minHeight={100}
        >
          <Button startIcon={<LoyaltyRoundedIcon />}>Sale 50% off</Button>
          <Typography variant={"h5"}>{asset.name}</Typography>
          <Typography lineHeight={1}>
            Check it out in our marketplace. Help to save the planet.
          </Typography>
        </Grid>
      </Grid>
      <Grid item height={20}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          minHeight={100}
        >
          <Box
            sx={(theme) => ({
              paddingTop: 1,
              paddingLeft: 1,
              paddingRight: 1,
              color: "white",
              borderRadius: 2,

              backgroundColor: theme.palette.primary.main,
            })}
          >
            <ArrowForwardRoundedIcon />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
