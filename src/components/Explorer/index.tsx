import { Box } from "@mui/system";
import { ERC245Collection, ERC423Collection } from "components/Explorer/context/datasource";
import { Outlet, useParams } from "react-router-dom";
import { getMockAsset, getMockMovement, mockDataSource } from "./context/datasourceMock";
import { ExplorerProvider } from "./context/explorerContext";

const mockERC245: ERC245Collection = {
  assets: { 1: getMockAsset() },
  assetCertificates: { 1: [] },
  compositions: { 1: [] },
  parents: { 1: [] },
  traceabilities: { 1: [1, 2] },

  certificates: {},
  movements: {
    1: getMockMovement(1, "HAVANA", "CU", 3000, "Fri Jul 02 2021", 56000, 200, "", ""),
    2: getMockMovement(1, "GUANTANAMO", "CU", 1200000, "Fri Jul 02 2021", 340000, 4000, "", ""),
  },
};

const mockERC423: ERC423Collection = {
  accounts: {},
};

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
      <ExplorerProvider
        asset_id={parseInt(asset_id)}
        dataSource={mockDataSource(mockERC245, mockERC423)}
      >
        <Outlet />
      </ExplorerProvider>
    </Box>
  );
};
