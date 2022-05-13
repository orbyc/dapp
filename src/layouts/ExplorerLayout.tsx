import { Box } from "@mui/system";
import { Explorer } from "components/Explorer";
import { blockchainMocks } from "components/Explorer/context/blockchainMocks";
import { mockDataSource } from "components/Explorer/context/datasource";
import React from "react";
import { useParams } from "react-router-dom";


export const ExplorerLayout = () => {
  const { asset_id } = useParams();

  if (!asset_id) {
    return <h3>404 not found!</h3>;
  }

  return (
    <Box
      position={"relative"}
      minHeight={"100vh"}
      maxWidth={1024}
      display={"flex"}
      flexDirection={"column"}
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Explorer asset={parseInt(asset_id)} dataSource={mockDataSource(blockchainMocks)} />
    </Box>
  );
};