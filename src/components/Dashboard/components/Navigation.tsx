import { Link } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import { useContext, useState } from "react";
import { AppBar, Dialog, IconButton, Toolbar } from "@mui/material";
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

export function Navigation() {
  const { chainId } = useMetaMask();
  const account = useContext(AccountContext);

  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

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
          <button onClick={handleOpen}>Issue</button>
        </li>
        <li>
          Connected account {account} on chain ID {chainId}
        </li>
      </ul>
    </>
  );
}

interface FormModalProps {
  open: boolean;
  handleClose: () => void;
}

function FormModal({ open, handleClose }: FormModalProps) {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <AppBar sx={{ position: "relative" }} color="transparent" elevation={0}>
          <Toolbar>
            <TabList onChange={handleChange} aria-label="select-item-tabs" sx={{ flex: 1 }}>
              <Tab icon={<FeedRoundedIcon />} value="1" />
              <Tab icon={<TimelineRoundedIcon />} value="2" />
              <Tab icon={<VerifiedUserRoundedIcon />} value="3" />
            </TabList>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <TabPanel value="1">
          <AssetForm />
        </TabPanel>
        <TabPanel value="2">
          <MovementForm />
        </TabPanel>
        <TabPanel value="3">
          <CertificateForm />
        </TabPanel>
      </Dialog>
    </TabContext>
  );
}
