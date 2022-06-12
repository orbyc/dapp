import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import { IconButton } from "@mui/material";
import { Button } from "./Button";
import { ExplorerContext, navigate, Route } from "components/Explorer/context/explorerContext";

interface NavButtonProps {
  children?: React.ReactNode;
  path: Route;
  text: string;
  active?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({ active, path, text, children }) => {
  const { state, dispatch } = useContext(ExplorerContext);
  const { asset_id, route } = state.routes.current;

  const handleNavigate = (route: Route) => () => dispatch(navigate(asset_id, route));

  if (active || path === route)
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
        <NavButton text="Asset" path={"ASSET"}>
          <FeedRoundedIcon sx={{ cursor: "pointer" }} />
        </NavButton>
        <NavButton text="Certificate" path={"CERTIFICATES"}>
          <VerifiedUserRoundedIcon sx={{ cursor: "pointer" }} />
        </NavButton>
        <NavButton text="Traceability" path={"TRACEABILITY"}>
          <TimelineRoundedIcon sx={{ cursor: "pointer" }} />
        </NavButton>
        <NavButton text="Statistics" path={"STATISTICS"}>
          <BarChartRoundedIcon sx={{ cursor: "pointer" }} />
        </NavButton>
        <NavButton text="QRCode" path={"QRCODE"}>
          <CropFreeRoundedIcon />
        </NavButton>
      </Grid>
    </Box>
  </>
);
