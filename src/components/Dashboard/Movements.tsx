import { Field, Form, Formik } from "formik";
import { Movement } from "orbyc-core/pb/domain_pb";
import { useContext, useState } from "react";
import { FormModal } from "./components/FormModal";
import { MovementCertificatesForm } from "./components/MovementForm";
import { DataSourceContext } from "./context/DataSourceContext";

interface SearchForm {
  search: string;
}

type ModalForm = "CERTIFICATES";

export default function Movements() {
  const [open, setOpen] = useState<ModalForm>();
  const handleOpen = (form: ModalForm) => () => setOpen(form);
  const handleClose = () => setOpen(undefined);

  const datasource = useContext(DataSourceContext);

  const [movement, setMovement] = useState<Movement>();

  const handleSubmit = async ({ search }: SearchForm) => {
    try {
      const data = await datasource.erc245.getMovement(parseInt(search));
      setMovement(data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <div>
        Search movement
        <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
          <Form>
            <Field type="number" name="search" />
            <button type="submit">Search</button>
          </Form>
        </Formik>
        {movement && (
          <>
            <FormModal handleClose={handleClose} open={open}>
              <>
                {open === "CERTIFICATES" && <MovementCertificatesForm moveid={movement.getId()} />}
              </>
            </FormModal>
            <ul>
              <li>{movement.getId()}</li>
              <li>{movement.getIssuer()}</li>

              <li>
                <button onClick={handleOpen("CERTIFICATES")}>Add Certificates</button>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}
