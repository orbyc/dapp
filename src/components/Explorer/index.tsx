import { Box, createTheme, CssBaseline, IconButton, ThemeProvider, Tooltip } from "@mui/material";
import { back, ExplorerContext, ExplorerProvider, ExplorerProviderProps } from "./context/explorer_context";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { useContext } from "react";
import { ExplorerFooter } from "./components/Navigation";
import { StatisticsRender } from "./components/Pages";
import { CertificateView } from "./CertificateView";
import { QRCodeView } from "./QRCodeView";
import { AssetView } from "./AssetView";
import { TraceabilityView } from "./TraceabilityView";

export const explorerTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Dongle", sans-serif',
    },
  },
  palette: {
    background: {
      default: "#F4FAFA",
      paper: "white",
    },
    primary: {
      main: "#0A785A",
      contrastText: "#D5DAE1",
    },
    secondary: {
      main: "#E7FAF8",
      contrastText: "#0A785A",
    },
  },
});

export const Explorer = (props: ExplorerProviderProps) => {
  return (
    <ExplorerProvider {...props}>
      <ThemeProvider theme={explorerTheme}>
        <CssBaseline />
        <Box
          bgcolor={explorerTheme.palette.background.default}
          display={"flex"}
          flexDirection="column"
          flexGrow={1}
        >
          <ExplorerBack />
          <ExplorerRoutes />
          <ExplorerFooter />
        </Box>
      </ThemeProvider>
    </ExplorerProvider>
  );
};

const ExplorerRoutes = () => {
  const { state } = useContext(ExplorerContext);

  switch (state.routes.current.route) {
    case "ASSET":
      return <AssetView />;
    case "CERTIFICATES":
      return <CertificateView />;
    case "TRACEABILITY":
      return <TraceabilityView />;
    case "STATISTICS":
      return <StatisticsRender />;
    case "QRCODE":
      return <QRCodeView />;

    default:
      return <>Hello</>;
  }
};

const ExplorerBack = () => {
  const { dispatch } = useContext(ExplorerContext);
  const handleBack = () => dispatch(back());
  return (
    <Tooltip title="back" sx={{ position: "absolute", color: "white", top: 10, left: 15 }}>
      <IconButton onClick={handleBack}>
        <ArrowBackRoundedIcon />
      </IconButton>
    </Tooltip>
  );
};
