import { Link } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import React, { useContext, useState } from "react";

import { AccountContext } from "../context/DataSourceContext";
import { CertificateForm } from "./CertificateForm";
import { MovementForm } from "./MovementForm";
import { AssetForm } from "./AssetForm";

import { FormModal } from "./FormModal";

export type ModalForm = "ASSET" | "CERTIFICATE" | "MOVEMENT";

export function Navigation() {
  const { chainId } = useMetaMask();
  const account = useContext(AccountContext);

  const [open, setOpen] = useState<ModalForm>();
  const handleOpen = (form: ModalForm) => () => setOpen(form);
  const handleClose = () => setOpen(undefined);

  return (
    <>
      <FormModal open={open} handleClose={handleClose}>
        <>
          {open === "ASSET" && <AssetForm />}
          {open === "MOVEMENT" && <MovementForm />}
          {open === "CERTIFICATE" && <CertificateForm />}
        </>
      </FormModal>
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
