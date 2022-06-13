import { createContext } from "react";
import { DataSource } from "components/Explorer/context/datasource";
import { mockDataSource } from "components/Explorer/context/datasourceMock";
import { mockERC245, mockERC423 } from "components/Explorer";

export const DataSourceContext = createContext<DataSource>(mockDataSource(mockERC245, mockERC423));
export const AccountContext = createContext<string>("");
