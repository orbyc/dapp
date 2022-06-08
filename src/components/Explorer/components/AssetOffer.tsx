import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded";
import { Button } from "./Button";
import { useContext } from "react";
import { ExplorerContext } from "../context/explorer_context";
import { AssetMetadata } from "orbyc-core/pb/metadata_pb";
import { decodeHex } from "orbyc-core/utils/encoding";
import useFetch from "utils/hooks";

export function AssetOffer() {
  const {
    state: {
      routes: { current },
      dataSource,
    },
  } = useContext(ExplorerContext);

  const { data: asset, loading, error } = useFetch(dataSource.erc245.getAsset(current.asset_id));

  if (loading || asset == null) {
    return <>loading...</>;
  }

  if (error != null) {
    return <>{error.message}</>;
  }

  const metadata = AssetMetadata.deserializeBinary(decodeHex(asset.getMetadata()));

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
          sx={{ backgroundImage: `url(${metadata.getBackground()})`, backgroundSize: "cover" }}
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
          <Typography variant={"h5"}>{metadata.getName()}</Typography>
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
