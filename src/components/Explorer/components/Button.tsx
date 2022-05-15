import { Button as MuiButton, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Button = styled(MuiButton)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 25,
  paddingTop: 3,
  paddingBottom: 3,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
}));


export const SquaredButton = styled(MuiButton)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 8,
  paddingTop: 3,
  paddingBottom: 3,
  boxShadow: "none",
  color: "white",
  "&:hover": {
    backgroundColor: "",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
}));

export const LongButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: "80px",
  backgroundColor: "transparent",
  alignItems: "baseline",
  padding: "2px",
  minWidth: "20px",
  height: "86px",
  boxShadow: "none",
  border: `3px solid white`,
  color: "black",
  fontSize: "12px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
}));

export const FabIcon = styled(Fab)(({ theme }) => ({
  backgroundColor: "white",
  // paddingTop: "10px",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
}));

export const IconTextButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: "2px",
  minWidth: "20px",
  boxShadow: "none",
  color: "black",
  fontSize: "12px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  "&:focus": {},
}));