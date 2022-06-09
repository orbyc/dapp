import { Box, Grid, IconButton, Typography } from "@mui/material";
import { ExplorerCard } from "./components/ExplorerCard";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { useState } from "react";
import { Button } from "./components/Button";
import { QRCode } from "react-qrcode-logo";
import { ExplorerHeader } from "./components/HeaderInfo";

interface CertQRCodeProps {
  certId: number;
}

export const CertQRCode = (props: CertQRCodeProps) => {
  return (
    <QRCode
      value="https://mui.com/components/grid/#main-content"
      qrStyle="dots"
      quietZone={40}
      eyeRadius={10}
    />
  );
};
interface CertificateCardProps {
  certId: number;

  active?: boolean;
  onClick: () => void;
}

export const CertificateCard = (props: CertificateCardProps) => {
  const certDisplay = (
    <>
      <Grid container justifyContent={"center"}>
        <CertQRCode certId={props.certId} />
      </Grid>
      <Button fullWidth>View in Orbyc</Button>
    </>
  );

  return (
    <ExplorerCard className="cursor-pointer" onClick={props.onClick}>
      <Grid container justifyContent={"space-between"} alignItems={"center"} spacing={2}>
        <Grid item>
          <Typography variant="h5">Circular Economy Certificate</Typography>
        </Grid>
        <Grid item>
          <IconButton size="large" sx={{ color: "#007B55" }}>
            <GppGoodIcon color="inherit" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"} spacing={2}>
        <Grid item>
          <Typography variant={"subtitle1"}>Orbyc inc.</Typography>
        </Grid>
        <Grid item>
          <Typography variant={"caption"}>{new Date().toLocaleDateString()}</Typography>
        </Grid>
      </Grid>
      {props.active && certDisplay}
    </ExplorerCard>
  );
};

export const CertificateView = () => {
  const [selected, setSelected] = useState<number>();
  const setActiveCertificate = (value: number) => () => setSelected(value);

  return (
    <>
      <ExplorerHeader />
      <Box marginTop={3} />
      {[1].map((e) => (
        <Grid container justifyContent={"center"} paddingTop={3}>
          <CertificateCard active={selected === e} certId={e} onClick={setActiveCertificate(e)} />
        </Grid>
      ))}
    </>
  );
};
