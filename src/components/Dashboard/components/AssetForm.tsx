import { Asset } from "orbyc-core/pb/domain_pb";
import { AssetMetadata, Image, Link } from "orbyc-core/pb/metadata_pb";
import { decodeHex } from "orbyc-core/utils/encoding";

import { Form, Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import StepForm from "./StepForm";

interface Composition {
  parentid: number;
  percent: number;
}

interface AssetRelations {
  traceabilityList: number[];
  compositionsList: Composition[];
  certificatesList: number[];
}

interface FormProps {
  values: AssetMetadata.AsObject & Asset.AsObject & AssetRelations;
}

const validationSchema = yup.object({});

export function AssetForm() {
  /* load asset data TODO: get as dependencies */
  const asset = new Asset();
  const metadata = AssetMetadata.deserializeBinary(decodeHex(asset.getMetadata()));
  const relations: AssetRelations = {
    compositionsList: [],
    traceabilityList: [],
    certificatesList: [],
  };

  /* parse creation date */
  const creationTimestamp = metadata.getCreation()?.getDate();
  const creationDate = new Date();
  if (creationTimestamp) {
    creationDate.setUTCSeconds(creationTimestamp.getSeconds());
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
        <label htmlFor="name">Asset name</label>
        <Field type="text" name="name" />
        <ErrorMessage name="name" component="div" />
      </div>
      <div>
        <label htmlFor="creation.description">Description</label>
        <Field type="text" name="creation.description" />
        <ErrorMessage name="creation.description" component="div" />
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
      <div>
        <label htmlFor="header">Header message</label>
        <Field type="text" name="header" />
        <ErrorMessage name="header" component="div" />
      </div>
      <div>
        <label htmlFor="background.attachment">Header image</label>
        <Field type="text" name="background.attachment" />
        <ErrorMessage name="background.attachment" component="div" />
      </div>
    </div>
  );

  const PropertiesForm = ({ values }: FormProps) => (
    <FieldArray name="propertiesList">
      {({ remove, push }) => (
        <>
          {values.propertiesList &&
            values.propertiesList.map((_, index) => (
              <div key={index}>
                <div className="row">
                  <label htmlFor={`propertiesList.${index}.name`}>Name</label>
                  <Field name={`propertiesList.${index}.name`} type="text" />
                  <ErrorMessage
                    name={`propertiesList.${index}.name`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="row">
                  <label htmlFor={`propertiesList.${index}.value`}>Value</label>
                  <Field name={`propertiesList.${index}.value`} type="text" />
                  <ErrorMessage
                    name={`propertiesList.${index}.value`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="row">
                  <label htmlFor={`propertiesList.${index}.icon`}>Icon</label>
                  <Field name={`propertiesList.${index}.icon`} type="text" />
                  <ErrorMessage
                    name={`propertiesList.${index}.icon`}
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
              const element: AssetMetadata.Property.AsObject = { icon: "", name: "", value: "" };
              push(element);
            }}
          >
            Add Property
          </button>
        </>
      )}
    </FieldArray>
  );

  const GalleryForm = ({ values }: FormProps) => (
    <FieldArray name="imagesList">
      {({ remove, push }) => (
        <>
          {values.imagesList &&
            values.imagesList.map((_, index) => (
              <div key={index}>
                <div className="row">
                  <label htmlFor={`imagesList.${index}.name`}>Name</label>
                  <Field name={`imagesList.${index}.name`} type="text" />
                  <ErrorMessage
                    name={`imagesList.${index}.name`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="row">
                  <label htmlFor={`imagesList.${index}.attachment`}>Attachment</label>
                  <Field name={`imagesList.${index}.attachment`} type="text" />
                  <ErrorMessage
                    name={`imagesList.${index}.attachment`}
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
              const element: Image.AsObject = { attachment: "", name: "" };
              push(element);
            }}
          >
            Add Image
          </button>
        </>
      )}
    </FieldArray>
  );

  const CreationForm = () => (
    <div>
      <div>
        <label htmlFor="createdAt">Creation date</label>
        <Field type="datetime-local" name="createdAt" />
        <ErrorMessage name="createdAt" component="div" />
      </div>
      <div>
        <label htmlFor="creation.location">City</label>
        <Field type="text" name="creation.location" />
        <ErrorMessage name="creation.location" component="div" />
      </div>
      <div>
        <label htmlFor="creation.country">Country</label>
        <Field type="text" name="creation.country" />
        <ErrorMessage name="creation.country" component="div" />
      </div>
      <div>
        <label htmlFor="creation.lat">Latitude</label>
        <Field type="text" name="creation.lat" />
        <ErrorMessage name="creation.lat" component="div" />
      </div>
      <div>
        <label htmlFor="creation.lng">Longitude</label>
        <Field type="text" name="creation.lng" />
        <ErrorMessage name="creation.lng" component="div" />
      </div>
    </div>
  );

  const LinksForm = ({ values }: FormProps) => (
    <FieldArray name="linksList">
      {({ remove, push }) => (
        <>
          {values.linksList &&
            values.linksList.map((_, index) => (
              <div key={index}>
                <div className="row">
                  <label htmlFor={`linksList.${index}.name`}>Name</label>
                  <Field name={`linksList.${index}.name`} type="text" />
                  <ErrorMessage
                    name={`linksList.${index}.name`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="row">
                  <label htmlFor={`linksList.${index}.icon`}>Icon</label>
                  <Field name={`linksList.${index}.icon`} type="text" />
                  <ErrorMessage
                    name={`linksList.${index}.icon`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="row">
                  <label htmlFor={`linksList.${index}.url`}>Url</label>
                  <Field name={`linksList.${index}.url`} type="text" />
                  <ErrorMessage
                    name={`linksList.${index}.url`}
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
              const element: Link.AsObject = { icon: "", name: "", url: "" };
              push(element);
            }}
          >
            Add External Link
          </button>
        </>
      )}
    </FieldArray>
  );

  const CompositionForm = ({ values }: FormProps) => (
    <FieldArray name="compositionsList">
      {({ remove, push }) => (
        <>
          {values.compositionsList &&
            values.compositionsList.map((_, index) => (
              <div key={index}>
                <div className="row">
                  <label htmlFor={`compositionsList.${index}.parentid`}>Parent Id</label>
                  <Field name={`compositionsList.${index}.parentid`} type="number" />
                  <ErrorMessage
                    name={`compositionsList.${index}.parentid`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <div className="row">
                  <label htmlFor={`compositionsList.${index}.percent`}>Percent</label>
                  <Field
                    name={`compositionsList.${index}.percent`}
                    type="number"
                    max="100"
                    min="1"
                  />
                  <ErrorMessage
                    name={`compositionsList.${index}.percent`}
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
              const element: Composition = { parentid: 0, percent: 50 };
              push(element);
            }}
          >
            Add Parent
          </button>
        </>
      )}
    </FieldArray>
  );

  const TraceabilityForm = ({ values }: FormProps) => (
    <FieldArray name="traceabilityList">
      {({ remove, push }) => (
        <>
          {values.traceabilityList &&
            values.traceabilityList.map((_, index) => (
              <div key={index}>
                <div className="row">
                  <label htmlFor={`traceabilityList.${index}`}>Movement Id</label>
                  <Field name={`traceabilityList.${index}`} type="number" />
                  <ErrorMessage
                    name={`traceabilityList.${index}`}
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
            Add Movement
          </button>
        </>
      )}
    </FieldArray>
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
        ...asset.toObject(),
        ...metadata.toObject(),
        ...relations,
        createdAt: creationDate,
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
            { label: "Properties", element: <PropertiesForm values={values} /> },
            { label: "Gallery", element: <GalleryForm values={values} /> },
            { label: "Creation", element: <CreationForm /> },
            { label: "Links", element: <LinksForm values={values} /> },
            { label: "Composition", element: <CompositionForm values={values} /> },
            { label: "Traceability", element: <TraceabilityForm values={values} /> },
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
