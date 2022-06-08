import { Asset, Certificate, Movement } from "orbyc-core/pb/domain_pb";
import { AccountMetadata } from "orbyc-core/pb/metadata_pb";
import React, { createContext, useEffect, useState } from "react";
import { DataSource } from "./datasource";
/*
    ASSET CONTEXT
*/
type AssetContextDomain = {
  asset: Asset;
  issuer: AccountMetadata;
  certificates: Certificate[];
  traceability: Movement[];
  composition: { asset: Asset; composition: number }[];
};

export const AssetContext = createContext({} as AssetContextDomain);

interface AssetProviderProps {
  children?: React.ReactNode;
  dataSource: DataSource;
  asset_id: number;
}

export const AssetProvider: React.FC<AssetProviderProps> = ({ dataSource, asset_id, children }) => {
  const [domain, setDomain] = useState<AssetContextDomain>();

  useEffect(() => {}, [setDomain, asset_id, dataSource]);

  if (!domain) {
    return <>No domain</>;
  }

  return <AssetContext.Provider value={domain}>{children}</AssetContext.Provider>;
};
