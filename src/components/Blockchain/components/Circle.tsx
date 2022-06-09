import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface ICircle {
  children?: React.ReactNode;
  size?: number;
  sx?: {};
}

export const Circle: React.FC<ICircle> = ({ size, sx, children }) => {
  const StyledCircle = styled(Box)(({ theme }) => ({
    width: size ?? 6,
    height: size ?? 6,
    background: theme.palette.grey[400],
    borderRadius: "50%",
    // marginTop: 6,
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
    },
    "&:focus": {},
  }));

  return <StyledCircle {...sx}>{children}</StyledCircle>;
};
