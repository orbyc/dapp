import { Link } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export function Navigation() {
  const { account, chainId } = useMetaMask();

  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl"> 
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <ul>
        <li>
          <Link to={`/dashboard`}>Assets</Link>
        </li>
        <li>
          <Link to={`/dashboard/certificates`}>Certificates</Link>
        </li>
        <li>
          <Link to={`/dashboard/movements`}>Movements</Link>
        </li>
        <li>
          <button onClick={handleOpen}>Issue</button>
        </li>
        <li>
          Connected account {account} on chain ID {chainId}
        </li>
      </ul>
    </>
  );
}
