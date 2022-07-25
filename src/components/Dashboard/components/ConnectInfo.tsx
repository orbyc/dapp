import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/identity/logo.png";
import metamaskLogo from "../../../assets/identity/metamask.svg";
import connectingGif from "../../../assets/gifs/transferring.gif";
import toConnect from "../../../assets/identity/connect.png";
import ReportIcon from "@mui/icons-material/Report";
import { useTheme } from "@mui/material/styles";

type ConnectInfoProps = {
  status?: string;
  onclick?: any;
};
const ConnectInfo = ({ status, onclick }: ConnectInfoProps) => {
  const [displayText, setDisplayText] = useState<string>();
  const theme = useTheme();

  useEffect((): void => {
    if (status === "notConnected") {
      setDisplayText("Connect to MetaMask");
    } else if (status === "initializing") {
      setDisplayText("Synchronization with MetaMask ongoing...");
    } else if (status === "unavailable") {
      setDisplayText("MetaMask not available");
    } else if (status === "connecting") {
      setDisplayText("Connecting...");
    }
  }, [status]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "20px",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              marginBottom:"38px"
            },
          }}
        >
          <img src={logo} alt="Orbyc" style={{ maxWidth: "200px" }} />
          {status === "unavailable" ? (
            <ReportIcon sx={{ color: "#ba000d" }} fontSize="large" />
          ) : (
            <img
              style={{ maxWidth: "100px" }}
              src={status === "connecting" ? connectingGif : toConnect}
            />
          )}
          <img
            src={metamaskLogo}
            alt="Metamask"
            style={{ maxWidth: "200px" }}
          />
        </Box>
        <Button
          sx={{
            backgroundColor: "#0b785b",
            color: "#ffffff",
            opacity: "0.9",
            marginTop: "24px",
            "&:hover": {
              backgroundColor: "#0b785b",
              color: "#ffffff",
              opacity: "1",
            },
          }}
          onClick={status === "notConnected" ? onclick : () => {}}
        >
          {displayText || "Loading..."}
        </Button>
      </Box>
    </Box>
  );
};

export default ConnectInfo;
