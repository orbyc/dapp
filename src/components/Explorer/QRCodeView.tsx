import { Grid } from "@mui/material";
import { ExplorerHeader } from "./components/HeaderInfo";
import { OrbycQrCode } from "./components/OrbycQrCode";


export const QRCodeView = () => (
  <>
    <ExplorerHeader />
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <OrbycQrCode />
    </Grid>
  </>
);
