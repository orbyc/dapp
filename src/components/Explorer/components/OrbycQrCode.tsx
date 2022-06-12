import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ExplorerContext } from "components/Explorer/context/explorerContext";
import { QRCode } from "react-qrcode-logo";
import logo from "assets/identity/qr-logo.png";

export function OrbycQrCode() {
  const { state } = useContext(ExplorerContext);
  const { id: asset_id } = state.routes.current;

  const theme = useTheme();
  return (
    <QRCode
      value={`orbyc.github.io/dapp/#/asset/${asset_id}`}
      bgColor={theme.palette.background.default}
      logoImage={logo}
      fgColor="#0A785A"
      eyeRadius={10}
      size={280}
      quietZone={50}
      logoWidth={58}
      ecLevel="H"
      qrStyle="dots"
    />
  );
}
