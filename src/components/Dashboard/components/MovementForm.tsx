import { Movement } from "orbyc-core/pb/domain_pb";
import { MovementMetadata } from "orbyc-core/pb/metadata_pb";
import { decodeHex } from "orbyc-core/utils/encoding";

import { Form, Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import StepForm from "./StepForm";

interface MovementRelations {
  certificatesList: number[];
}

interface FormProps {
  values: MovementMetadata.AsObject & Movement.AsObject & MovementRelations;
}

const validationSchema = yup.object({});

export function MovementForm() {
  const movement = new Movement();
  const metadata = MovementMetadata.deserializeBinary(decodeHex(movement.getMetadata()));
  const relations: MovementRelations = { certificatesList: [] };

  /* parse departure date */
  const departureTimestamp = metadata.getFrom()?.getDate();
  const departureDate = new Date();
  if (departureTimestamp) {
    departureDate.setUTCSeconds(departureTimestamp.getSeconds());
  }

  /* parse arrival date */
  const arrivalTimestamp = metadata.getTo()?.getDate();
  const arrivalDate = new Date();
  if (arrivalTimestamp) {
    arrivalDate.setUTCSeconds(arrivalTimestamp.getSeconds());
  }

  /* steps forms */
  const GeneralForm = () => (
    <div>
      <div>
        <label htmlFor="id">Serial number</label>
        <Field type="number" name="id" />
        <ErrorMessage name="id" component="div" />
      </div>
      <div>
        <label htmlFor="type">Transportation type</label>
        <Field type="select" name="type" component="select">
          <option value="CREATE">Create</option>
          <option value="AIR">Air</option>
          <option value="SEA">Sea</option>
          <option value="LAND">Land</option>
        </Field>
        <ErrorMessage name="type" component="div" />
      </div>
      <div>
        <label htmlFor="certid">Emissions certificate</label>
        <Field type="number" name="certid" />
        <ErrorMessage name="certid" component="div" />
      </div>
      <div>
        <label htmlFor="distance">Distance</label>
        <Field type="number" name="distance" />
        <ErrorMessage name="distance" component="div" />
      </div>
      <div>
        <label htmlFor="co2e">Carbon Emissions</label>
        <Field type="number" name="co2e" />
        <ErrorMessage name="co2e" component="div" />
      </div>
      <div>
        <label htmlFor="certid">Emissions certificate</label>
        <Field type="number" name="certid" />
        <ErrorMessage name="certid" component="div" />
      </div>
    </div>
  );

  const DepartureForm = () => (
    <div>
      <div>
        <label htmlFor="departureat">Departure date</label>
        <Field type="datetime-local" name="departureat" />
        <ErrorMessage name="departureat" component="div" />
      </div>
      <div>
        <label htmlFor="from.location">City</label>
        <Field type="text" name="from.location" />
        <ErrorMessage name="from.location" component="div" />
      </div>
      <div>
        <label htmlFor="from.country">Country</label>
        <Field type="text" name="from.country" />
        <ErrorMessage name="from.country" component="div" />
      </div>
      {/* <div>
        <label htmlFor="from.lat">Latitude</label>
        <Field type="text" name="from.lat" />
        <ErrorMessage name="from.lat" component="div" />
      </div>
      <div>
        <label htmlFor="from.lng">Longitude</label>
        <Field type="text" name="from.lng" />
        <ErrorMessage name="from.lng" component="div" />
      </div> */}
    </div>
  );

  const ArrivalForm = () => (
    <div>
      <div>
        <label htmlFor="arrivalat">Arrival date</label>
        <Field type="datetime-local" name="arrivalat" />
        <ErrorMessage name="arrivalat" component="div" />
      </div>
      <div>
        <label htmlFor="to.location">City</label>
        <Field type="text" name="to.location" />
        <ErrorMessage name="to.location" component="div" />
      </div>
      <div>
        <label htmlFor="to.country">Country</label>
        <Field type="text" name="to.country" />
        <ErrorMessage name="to.country" component="div" />
      </div>
      {/* <div>
        <label htmlFor="to.lat">Latitude</label>
        <Field type="text" name="to.lat" />
        <ErrorMessage name="to.lat" component="div" />
      </div>
      <div>
        <label htmlFor="to.lng">Longitude</label>
        <Field type="text" name="to.lng" />
        <ErrorMessage name="to.lng" component="div" />
      </div> */}
    </div>
  );

  const CertificatesForm = ({ values }: FormProps) => (
    <FieldArray name="certificatesList">
      {({ remove, push }) => (
        <>
          {values.certificatesList &&
            values.certificatesList.map((_, index) => (
              <div key={index}>
                <div className="row">
                  <label htmlFor={`certificatesList.${index}`}>Certificate Id</label>
                  <Field name={`certificatesList.${index}`} type="number" />
                  <ErrorMessage
                    name={`certificatesList.${index}`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="col">
                  <button type="button" className="secondary" onClick={() => remove(index)}>
                    X
                  </button>
                </div>
              </div>
            ))}

          <button
            type="button"
            className="secondary"
            onClick={() => {
              const element: number = 0;
              push(element);
            }}
          >
            Add Certificate
          </button>
        </>
      )}
    </FieldArray>
  );

  const PublishForm = () => (
    <>
      <button type="submit">Publish to Blockchain</button>
    </>
  );

  return (
    <Formik
      initialValues={{
        ...movement.toObject(),
        ...metadata.toObject(),
        ...relations,

        departureat: departureDate,
        arrivalat: arrivalDate,
      }}
      validationSchema={validationSchema}
      onSubmit={async (e) => {
        console.log({ e });
      }}
    >
      {({ values }) => (
        <StepForm
          steps={[
            { label: "General", element: <GeneralForm /> },
            { label: "Departure", element: <DepartureForm /> },
            { label: "Arrival", element: <ArrivalForm /> },
            { label: "Certificates", element: <CertificatesForm values={values} /> },
            { label: "Publish", element: <PublishForm /> },
          ]}
        >
          {(body) => <Form>{body}</Form>}
        </StepForm>
      )}
    </Formik>
  );
}
