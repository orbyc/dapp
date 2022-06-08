import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// import { Buffer } from "buffer";
// import { Asset } from "orbyc-core/pb/domain_pb";

import { AppRoutes } from "routes";
import "index.css";

// const App = () => {
//   const asset = new Asset();

//   asset.setId(1000);
//   asset.setIssuer("Address");
//   asset.setOwner("Address");

//   var assetObj = asset.serializeBinary();
//   var encoded = Buffer.from(assetObj).toString("hex");

//   var decoded = Uint8Array.from(Buffer.from(encoded, "hex"));

//   var asset2 = Asset.deserializeBinary(decoded);

//   return (
//     <>
//       <ul>
//         <li>{asset2.getId()}</li>
//         <li>{asset2.getIssuer()}</li>
//         <li>{asset2.getOwner()}</li>
//         <li>{encoded}</li>
//       </ul>
//     </>
//   );
// };

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
