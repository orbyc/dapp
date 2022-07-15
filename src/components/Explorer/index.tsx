import { Box } from "@mui/system";
import { BlockchainURL } from "components/constants";
import { ethers } from "ethers";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { EthersDataSource } from "./context/datasource";
import { ExplorerProvider, Route } from "./context/explorerContext";

export const ExplorerLayout = () => {
  const [searchParams] = useSearchParams();

  const route = searchParams.get("route");
  const id = searchParams.get("id");

  if (!route || !id) {
    return <Navigate to={`/dashboard`} />;
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
      <ExplorerProvider
        id={parseInt(id)}
        route={route as Route}
        dataSource={EthersDataSource(new ethers.providers.JsonRpcProvider(BlockchainURL))}
      >
        <Outlet />
      </ExplorerProvider>
    </Box>
  );
};
