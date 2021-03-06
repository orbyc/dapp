import { Movement } from "orbyc-core/pb/domain_pb";
import { Location, MovementMetadata } from "orbyc-core/pb/metadata_pb";
import { decodeHex, encodeHex } from "orbyc-core/utils/encoding";

import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import StepForm from "./StepForm";
import { SubmitFormProps } from "./AssetForm";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { SupplyChainAddress } from "components/constants";
import artifacts from "orbyc-contracts/artifacts/contracts/tokens/ERC245/ERC245.sol/ERC245.json";

// interface FormProps {
//   values: MovementMetadata.AsObject & Movement.AsObject;
// }

interface MovementRelations {
  certificatesList: number[];
}

interface MovementRelationsFormProps {
  values: MovementRelations;
}

interface MovementFormProps {
  moveid: number;
}

const validationSchema = yup.object({});

const PublishForm = ({ isSubmitting }: SubmitFormProps) => (
  <>
    <button type="submit" disabled={isSubmitting}>
      Publish to Blockchain
    </button>
  </>
);

export function MovementForm() {
  const { ethereum } = useMetaMask();

  const movement = new Movement();
  const metadata = MovementMetadata.deserializeBinary(decodeHex(movement.getMetadata()));

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
          <option value={0}>Create</option>
          <option value={1}>Air</option>
          <option value={2}>Sea</option>
          <option value={3}>Land</option>
        </Field>
        <ErrorMessage name="type" component="div" />
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
      <div>
        <label htmlFor="from.lat">Latitude</label>
        <Field type="text" name="from.lat" />
        <ErrorMessage name="from.lat" component="div" />
      </div>
      <div>
        <label htmlFor="from.lng">Longitude</label>
        <Field type="text" name="from.lng" />
        <ErrorMessage name="from.lng" component="div" />
      </div>
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
      <div>
        <label htmlFor="to.lat">Latitude</label>
        <Field type="text" name="to.lat" />
        <ErrorMessage name="to.lat" component="div" />
      </div>
      <div>
        <label htmlFor="to.lng">Longitude</label>
        <Field type="text" name="to.lng" />
        <ErrorMessage name="to.lng" component="div" />
      </div>
    </div>
  );

  return (
    <Formik
      initialValues={{
        ...movement.toObject(),
        ...metadata.toObject(),
        departureat: departureDate.toString(),
        arrivalat: arrivalDate.toString(),
      }}
      validationSchema={validationSchema}
      onSubmit={async (data, { setSubmitting }) => {
        try {
          const from = new Location();
          if (data.from) {
            from.setCountry(data.from.country);
            from.setDate(new Timestamp().setSeconds(Date.parse(data.departureat)));
            from.setLat(data.from.lat);
            from.setLng(data.from.lng);
            from.setLocation(data.from.location);
          }

          const to = new Location();
          if (data.to) {
            to.setCountry(data.to.country);
            to.setDate(new Timestamp().setSeconds(Date.parse(data.arrivalat)));
            to.setLat(data.to.lat);
            to.setLng(data.to.lng);
            to.setLocation(data.to.location);
          }

          const metadata = new MovementMetadata();
          metadata.setDistance(data.distance);
          metadata.setFrom(from);
          metadata.setTo(to);
          metadata.setType(data.type);

          const move = new Movement();
          move.setCertid(data.certid);
          move.setCo2e(data.co2e);
          move.setId(data.id);
          move.setMetadata(encodeHex(metadata.serializeBinary()));

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(SupplyChainAddress, artifacts.abi, signer);

          const tx = await contract.issueMovement(
            move.getId(),
            move.getCo2e(),
            move.getCertid(),
            move.getMetadata()
          );

          await tx.wait(1);
          console.log({ tx });
        } catch (error) {
          console.log({ error });
        }
      }}
    >
      {({ isSubmitting }) => (
        <StepForm
          steps={[
            { label: "General", element: <GeneralForm /> },
            { label: "Departure", element: <DepartureForm /> },
            { label: "Arrival", element: <ArrivalForm /> },

            { label: "Publish", element: <PublishForm isSubmitting={isSubmitting} /> },
          ]}
        >
          {(body) => <Form>{body}</Form>}
        </StepForm>
      )}
    </Formik>
  );
}

/*
  MOVEMENT CERTIFICATES
*/

export function MovementCertificatesForm(props: MovementFormProps) {
  const { ethereum } = useMetaMask();

  const relations: MovementRelations = { certificatesList: [] };

  const CertificatesForm = ({ values }: MovementRelationsFormProps) => (
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

  return (
    <Formik
      initialValues={{ ...relations }}
      validationSchema={validationSchema}
      onSubmit={async (data, { setSubmitting }) => {
        try {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(SupplyChainAddress, artifacts.abi, signer);

          const transaction = await contract.addMovementCertificates(
            props.moveid,
            data.certificatesList
          );
          console.log({ tx: transaction });
          setSubmitting(false);
        } catch (error) {
          console.log({ error });
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <StepForm
          steps={[
            { label: "Certificates", element: <CertificatesForm values={values} /> },
            { label: "Publish", element: <PublishForm isSubmitting={isSubmitting} /> },
          ]}
        >
          {(body) => <Form>{body}</Form>}
        </StepForm>
      )}
    </Formik>
  );
}
