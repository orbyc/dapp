import { Box } from "@mui/system";
import { Explorer } from "components/Explorer";
import {
  ERC245Collection,
  ERC423Collection,
  mockDataSource,
} from "components/Explorer/context/datasource";
import { useParams } from "react-router-dom";
import { getTestAsset } from "./mockCollection";

const mockERC245: ERC245Collection = {
  assets: { 1: getTestAsset() },
  assetCertificates: { 1: [] },
  compositions: { 1: [] },
  parents: { 1: [] },
  traceabilities: { 1: [] },

  certificates: {},
  movements: {},
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
      <Explorer asset_id={parseInt(asset_id)} dataSource={mockDataSource(mockERC245, mockERC423)} />
    </Box>
  );
};
