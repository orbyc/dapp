import { Button as MuiButton } from "@mui/material";
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
