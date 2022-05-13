import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Asset } from "orbyc-core/pb/domain_pb";

const App = () => {
  const asset = new Asset();

  asset.setId(1000);
  asset.setIssuer("Address");
  asset.setOwner("Address");

  return (
    <>
      <ul>
        <li>{asset.getId()}</li>
        <li>{asset.getIssuer()}</li>
        <li>{asset.getOwner()}</li>
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
