import { Field, Form, Formik } from "formik";
import { Certificate } from "orbyc-core/pb/domain_pb";
import { useContext, useState } from "react";
import { DataSourceContext } from "./context/DataSourceContext";

// async function getCertificates(ethereum: any, account: string) {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const contract = new ethers.Contract(SupplyChainAddress, artifacts.abi, provider);

//   const logs = contract.filters.CertIssued(null, account);
//   console.log({ logs });

//   const data = await provider.getLogs({
//     fromBlock: 0,
//     toBlock: `latest`,
//     ...logs,
//   });
//   console.log({ data });
//   return data;
// }

interface SearchForm {
  search: string;
}

export default function Certificates() {
  const datasource = useContext(DataSourceContext);

  const [certificate, setCertificate] = useState<Certificate>();

  const handleSubmit = async ({ search }: SearchForm) => {
    try {
      const data = await datasource.erc245.getCertificate(parseInt(search));
      setCertificate(data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      Search certificate
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field type="number" name="search" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {certificate && (
        <ul>
          <li>{certificate.getId()}</li>
          <li>{certificate.getIssuer()}</li>
        </ul>
      )}
    </div>
  );
}
