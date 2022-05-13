import { Box, createTheme, CssBaseline, IconButton, ThemeProvider, Tooltip } from "@mui/material";
import {
  back,
  ExplorerContext,
  ExplorerProvider,
  ExplorerProviderProps,
} from "./context";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { useContext } from "react";
import {
  ASSET_PAGE,
  CERT_PAGE,
  ExplorerFooter,
  PATH_PAGE,
  QR_PAGE,
  STATS_PAGE,
} from "./components/Navigation";
import {
  CertificateRender,
  StatisticsRender,
  TraceabilityRender,
} from "./components/Pages";
import { QRCodeView } from "./QRCodeView";
import { AssetView } from "./AssetView";

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

  switch (state.routes.current.page) {
    case ASSET_PAGE:
      return <AssetView />;
    case CERT_PAGE:
      return <CertificateRender />;
    case PATH_PAGE:
      return <TraceabilityRender />;
    case STATS_PAGE:
      return <StatisticsRender />;
    case QR_PAGE:
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
