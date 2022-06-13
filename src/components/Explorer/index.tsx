import { Box } from "@mui/system";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import {
  ERC245Collection,
  ERC423Collection,
  getMockAccount,
  getMockAsset,
  getMockMovement,
  mockDataSource,
} from "./context/datasourceMock";
import { ExplorerProvider, Route } from "./context/explorerContext";

export const mockERC245: ERC245Collection = {
  assets: { 1: getMockAsset() },
  assetCertificates: { 1: [] },
  compositions: { 1: [] },
  parents: { 1: [] },
  traceabilities: { 1: [1, 2] },

  certificates: {},
  
  movements: {
    1: getMockMovement(1),
    2: getMockMovement(2),
  },
  movementCertificates: {},
};

export const mockERC423: ERC423Collection = {
  accounts: { "0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F": getMockAccount() },
  agents: {
    "0x024269e2057b904d1fa6a7b52056a8580a85180f": "0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F",
  },
  roles: {
    0: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
    1: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
    2: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
    4: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
    8: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
  },
};

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
        dataSource={mockDataSource(mockERC245, mockERC423)}
      >
        <Outlet />
      </ExplorerProvider>
    </Box>
  );
};
