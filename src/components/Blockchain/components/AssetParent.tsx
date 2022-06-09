import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { ExplorerContext, navigate } from "../context/explorerContext";
import { ExplorerCard } from "./ExplorerCard";
import {useFetch} from "utils/hooks";
import { AssetMetadata } from "orbyc-core/pb/metadata_pb";
import { decodeHex } from "orbyc-core/utils/encoding";
import { Asset } from "orbyc-core/pb/domain_pb";
import { Loading } from "components/Loading";

interface AssetElementProps {
  id: number;
}

export const AssetParent: React.FC<AssetElementProps> = ({ id }) => {
  const { state, dispatch } = useContext(ExplorerContext);
  const { route: page } = state.routes.current;
  const { erc245 } = state.dataSource;

  const handleNavigate = () => dispatch(navigate(id, page));

  const { data: asset } = useFetch(erc245.getAsset(id));

  if (!asset) {
    return <Loading />;
  }

  const metadata = AssetMetadata.deserializeBinary(decodeHex(asset.getMetadata()));

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
            sx={{
              backgroundImage: `url(${metadata.getBackground()})`,
              backgroundSize: "cover",
            }}
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
            <AssetIssuerName asset={asset} />
            <Typography variant="h5" lineHeight={1}>
              {metadata.getName()}
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

interface AssetIssuerNameProps {
  asset: Asset;
}

const AssetIssuerName = (props: AssetIssuerNameProps) => {
  const {
    state: {
      dataSource: { erc423 },
    },
  } = useContext(ExplorerContext);

  const { data, loading } = useFetch(erc423.getAccount(props.asset.getIssuer()));

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <Typography variant="h5" lineHeight={1}>
      {data?.getName()}
    </Typography>
  );
};
