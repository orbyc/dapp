import { Outlet } from "react-router-dom";
import { MetaMaskProvider, useMetaMask } from "metamask-react";
import { Navigation } from "./components/Navigation";
import { AccountContext, DataSourceContext } from "./context/DataSourceContext";
import { useContext } from "react";
import { useFetch } from "utils/hooks";
import { Loading } from "components/Loading";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { EthersDataSource } from "components/Explorer/context/datasource";
import { ethers } from "ethers";

const theme = createTheme({
  shape: {
    borderRadius: 25,
  },
});

export function DashboardLayout() {
  return (
    <MetaMaskProvider>
      <LoginView />
    </MetaMaskProvider>
  );
}

function LoginView() {
  const { status, ethereum, connect } = useMetaMask();

  if (status === "initializing") return <div>Synchronization with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available</div>;

  if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>;

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected")
    return (
      <DataSourceContext.Provider
        value={EthersDataSource(
          new ethers.providers.Web3Provider(ethereum),
        )}
      >
        <AccountView />
      </DataSourceContext.Provider>
    );

  return <></>;
}

function AccountView() {
  const dataSource = useContext(DataSourceContext);
  const { account: agent } = useMetaMask();

  const { data: account, loading } = useFetch(dataSource.erc423.accountOf(agent || ""));

  if (loading) return <Loading />;

  if (!account) return <>Not account</>;

  return (
    <AccountContext.Provider value={account}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Outlet />
      </ThemeProvider>
    </AccountContext.Provider>
  );
}
