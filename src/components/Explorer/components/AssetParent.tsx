import React from "react";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { ExplorerContext, navigate } from "../context";
import { ExplorerCard } from "./ExplorerCard";

interface AssetElementProps {
  id: number;
}

export const AssetParent: React.FC<AssetElementProps> = ({ id }) => {
  const { state, dispatch } = useContext(ExplorerContext);
  const { page } = state.routes.current;
  const { erc245 } = state.dataSource;

  const [asset] = erc245.getAsset(id);

  const handleNavigate = () => dispatch(navigate(id, page));

  return (
    <ExplorerCard
      marginLeft={1.5}
      marginRight={1.5}
      marginBottom={3}
      minWidth={230}
      onClick={handleNavigate}
      className="cursor-pointer"
    >
      <Grid container direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"}>
        <Grid item>
          <Box
            width={60}
            height={60}
            borderRadius={3}
            marginRight={2}
            sx={{ backgroundImage: `url(${asset.metadata.image})`, backgroundSize: "cover" }}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
            height={60}
          >
            <Typography variant="caption" lineHeight={1}>
              {asset.metadata.fabricator}
            </Typography>
            <Typography variant="h5" lineHeight={1}>
              {asset.name}
            </Typography>
            {/* <Typography
              color={theme.palette.primary.main}
              fontSize={20}
              fontWeight={"bold"}
              lineHeight={1}
            >
              {asset.co2} (CO2e)
            </Typography> */}
          </Grid>
        </Grid>
      </Grid>
    </ExplorerCard>
  );
};