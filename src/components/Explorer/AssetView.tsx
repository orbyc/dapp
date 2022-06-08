import React, { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { AssetParent } from "./components/AssetParent";
import { ExplorerHeader } from "./components/HeaderInfo";
import { AssetOffer } from "./components/AssetOffer";
import { ExplorerContext } from "./context/explorer_context";
import { AssetProperty } from "./components/AssetProperty";
import useFetch from "utils/hooks";
import { WithAssetMetadata } from "utils/helpers";

export const AssetProperties: React.FC = () => {
  const { state } = useContext(ExplorerContext);
  const { asset_id } = state.routes.current;
  const { erc245 } = state.dataSource;

  const { data: composition } = useFetch(erc245.getAssetComposition(asset_id));
  const { data: asset } = useFetch(erc245.getAsset(asset_id));

  if (!composition || !asset) {
    return <>loading...</>;
  }

  const [parents, percent] = composition;

  const properties = (
    <WithAssetMetadata asset={asset}>
      {(metadata) => (
        <ScrollMenu>
          <Stack direction="row" spacing={2} ml={2} mt={2}>
            {metadata.getPropertiesList().map((prop) => (
              <AssetProperty asset_id={asset_id} property={prop} />
            ))}
          </Stack>
        </ScrollMenu>
      )}
    </WithAssetMetadata>
  );

  const compositionData = (
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

  return (
    <>
      {properties}
      {parents.length > 0 && compositionData}
    </>
  );
};

export const AssetView = () => (
  <>
    <ExplorerHeader />
    <AssetOffer />
    <AssetProperties />
  </>
);
