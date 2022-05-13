import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import { IconButton } from "@mui/material";
import { Button } from "./Button";
import { ExplorerContext, navigate } from "components/Explorer/context";

export const ASSET_PAGE = "ASSET";
export const CERT_PAGE = "CERT";
export const STATS_PAGE = "STATS";
export const PATH_PAGE = "PATH";
export const QR_PAGE = "QR";

interface NavButtonProps {
  children?: React.ReactNode;
  path: string;
  text: string;
  active?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({ active, path, text, children }) => {
  const { state, dispatch } = useContext(ExplorerContext);
  const { asset, page } = state.routes.current;

  const handleNavigate = (route: string) => () => dispatch(navigate(asset, route));

  if (active || path === page)
    return (
      <Button startIcon={children} variant="contained" size="large" color="secondary">
        {text}
      </Button>
    );

  return (
    <IconButton color="inherit" onClick={handleNavigate(path)}>
      {children}
    </IconButton>
  );
};

export const ExplorerFooter = () => (
  <>
    <Box minHeight={60} flexGrow={1} />
    <Box
      bgcolor={"white"}
      sx={{
        boxShadow: "0px -5px 30px 0px rgba(200,200,200,0.5)",
        width: "100%",
        position: "sticky",
        bottom: 0,
        borderRadius: 15,
      }}
    >
      <Grid container justifyContent={"space-evenly"} alignItems={"center"} color={"#D5DAE1"} p={1}>
        <NavButton text="Asset" path={ASSET_PAGE}>
          <FeedRoundedIcon sx={{ cursor: "pointer" }} />
        </NavButton>
        <NavButton text="Certificate" path={CERT_PAGE}>
          <VerifiedUserRoundedIcon sx={{ cursor: "pointer" }} />
        </NavButton>
        <NavButton text="Traceability" path={PATH_PAGE}>
          <TimelineRoundedIcon sx={{ cursor: "pointer" }} />
        </NavButton>
        <NavButton text="Statistics" path={STATS_PAGE}>
          <BarChartRoundedIcon sx={{ cursor: "pointer" }} />
        </NavButton>
        <NavButton text="QRCode" path={QR_PAGE}>
          <CropFreeRoundedIcon />
        </NavButton>
      </Grid>
    </Box>
  </>
);
