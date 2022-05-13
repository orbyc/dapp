import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { AssetParent } from "./components/AssetParent";
import { ExplorerHeader } from "./components/HeaderInfo";
import { AssetOffer } from "./components/AssetOffer";
import { ExplorerContext } from "./context";

export const AssetProperties: React.FC = () => {
  const { state } = useContext(ExplorerContext);
  const { asset } = state.routes.current;
  const { erc245 } = state.dataSource;

  const [[parents]] = erc245.getAssetComposition(asset);

  const composition = (
    <>
      <Typography variant="h4" marginLeft={3} marginTop={3} sx={{ opacity: 0.6 }}>
        Composition
      </Typography>
      <ScrollMenu>
        {parents.map((p) => (
          <AssetParent id={p} key={p} />
        ))}
      </ScrollMenu>
    </>
  );

  return <>{parents.length > 0 && composition}</>;
};

export const AssetView = () => (
  <>
    <ExplorerHeader />
    <AssetOffer />
    <AssetProperties />
  </>
);
