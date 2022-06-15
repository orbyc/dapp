import { Link } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import { useContext, useState } from "react";
import { AppBar, Box, Dialog, Grid, IconButton, Toolbar } from "@mui/material";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { AccountContext } from "../context/DataSourceContext";
import { CertificateForm } from "./CertificateForm";
import { MovementForm } from "./MovementForm";
import { AssetForm } from "./AssetForm";

import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import CloseIcon from "@mui/icons-material/Close";

type ModalForm = "ASSET" | "CERTIFICATE" | "MOVEMENT";

export function Navigation() {
  const { chainId } = useMetaMask();
  const account = useContext(AccountContext);

  const [open, setOpen] = useState<ModalForm>();
  const handleOpen = (form: ModalForm) => () => setOpen(form);
  const handleClose = () => setOpen(undefined);

  return (
    <>
      <FormModal open={open} handleClose={handleClose} />
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
          <button onClick={handleOpen("ASSET")}>Issue Asset</button>
        </li>
        <li>
          <button onClick={handleOpen("CERTIFICATE")}>Issue Certificate</button>
        </li>
        <li>
          <button onClick={handleOpen("MOVEMENT")}>Issue Movement</button>
        </li>
        <li>
          Connected account {account} on chain ID {chainId}
        </li>
      </ul>
    </>
  );
}

interface FormModalProps {
  open?: ModalForm;
  handleClose: () => void;
}

function FormModal({ open, handleClose }: FormModalProps) {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
      {open === "ASSET" && <AssetForm />}
      {open === "MOVEMENT" && <MovementForm />}
      {open === "CERTIFICATE" && <CertificateForm />}
    </Dialog>
  );
}
