import { Certificate } from "orbyc-core/pb/domain_pb";
import { CertificateMetadata } from "orbyc-core/pb/metadata_pb";
import { decodeHex } from "orbyc-core/utils/encoding";

import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import StepForm from "./StepForm";

const validationSchema = yup.object({});

export function CertificateForm() {
  const certificate = new Certificate();
  const metadata = CertificateMetadata.deserializeBinary(decodeHex(certificate.getMetadata()));

  /* parse creation date */
  const issuanceTimestamp = metadata.getDate();
  const issuanceDate = new Date();
  if (issuanceTimestamp) {
    issuanceDate.setUTCSeconds(issuanceTimestamp.getSeconds());
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
        <label htmlFor="issuedat">Issuance date</label>
        <Field type="datetime-local" name="issuedat" />
        <ErrorMessage name="issuedat" component="div" />
      </div>
      <div>
        <label htmlFor="url">Certificate URL</label>
        <Field type="text" name="url" />
        <ErrorMessage name="url" component="div" />
      </div>
      <div>
        <label htmlFor="attachment">File</label>
        <Field type="text" name="attachment" />
        <ErrorMessage name="attachment" component="div" />
      </div>
    </div>
  );
  const PublishForm = () => (
    <>
      <button type="submit">Publish to Blockchain</button>
    </>
  );

  return (
    <Formik
      initialValues={{
        ...certificate.toObject(),
        ...metadata.toObject(),

        issuedat: issuanceDate,
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

            { label: "Publish", element: <PublishForm /> },
          ]}
        >
          {(body) => <Form>{body}</Form>}
        </StepForm>
      )}
    </Formik>
  );
}
