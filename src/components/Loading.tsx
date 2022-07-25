import Box from "@mui/material/Box";
import React from "react";
import loadingWheel from "../assets/gifs/loading.gif";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
export const Loading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "100%",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <img style={{ width: "80px" }} src={loadingWheel} alt="Loading.." />
        <Typography
          variant="body1"
          sx={{ color: "#000000", textAlign: "center", fontSize: 12 }}
        >
          Loading
        </Typography>
      </Box>
    </Box>
  );
};
