import React from "react";
import { AppBar, Box, Dialog, IconButton, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function FormModal<T>({ open, handleClose, children }: FormModalProps<T>) {
  return (
    <Dialog open={open !== undefined} onClose={handleClose} maxWidth="xl" fullScreen>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar>
          <Box flex={1} />
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
}
interface FormModalProps<T> {
  open?: T;
  handleClose: () => void;
  children?: React.ReactNode;
}
