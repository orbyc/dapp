import { Field, Form, Formik } from "formik";
import { Asset } from "orbyc-core/pb/domain_pb";
import { useContext, useState } from "react";
import {
  AssetCertificatesForm,
  AssetCompositionForm,
  AssetTraceabilityForm,
} from "./components/AssetForm";
import { FormModal } from "./components/FormModal";
import { DataSourceContext } from "./context/DataSourceContext";

interface SearchForm {
  search: string;
}

type ModalForm = "CERTIFICATES" | "TRACEABILITY" | "COMPOSITION";

export default function Assets() {
  const [open, setOpen] = useState<ModalForm>();
  const handleOpen = (form: ModalForm) => () => setOpen(form);
  const handleClose = () => setOpen(undefined);

  const datasource = useContext(DataSourceContext);

  const [asset, setAsset] = useState<Asset>();

  const handleSubmit = async ({ search }: SearchForm) => {
    try {
      const data = await datasource.erc245.getAsset(parseInt(search));
      setAsset(data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <div>
        Search assets
        <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
          <Form>
            <Field type="number" name="search" />
            <button type="submit">Search</button>
          </Form>
        </Formik>
        {asset && (
          <>
            <FormModal handleClose={handleClose} open={open}>
              <>
                {open === "CERTIFICATES" && <AssetCertificatesForm assetid={asset.getId()} />}
                {open === "COMPOSITION" && <AssetCompositionForm assetid={asset.getId()} />}
                {open === "TRACEABILITY" && <AssetTraceabilityForm assetid={asset.getId()} />}
              </>
            </FormModal>
            <ul>
              <li>{asset.getId()}</li>
              <li>{asset.getIssuer()}</li>
              <li>{asset.getOwner()}</li>
              <li>
                <button onClick={handleOpen("CERTIFICATES")}>Add Certificates</button>
              </li>
              <li>
                <button onClick={handleOpen("COMPOSITION")}>Add Composition</button>
              </li>
              <li>
                <button onClick={handleOpen("TRACEABILITY")}>Add Traceability</button>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}
