import { Outlet } from "react-router-dom";
import { MetaMaskProvider, useMetaMask } from "metamask-react";
import { Navigation } from "./components/Navigation";
import { AccountContext, DataSourceContext } from "./context/DataSourceContext";
import { useContext } from "react";
import { useFetch } from "utils/hooks";
import { Loading } from "components/Loading";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { EthersDataSource } from "components/Explorer/context/datasource";
import { ethers } from "ethers";
import ConnectInfo from "./components/ConnectInfo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export function DashboardLayout() {
  return (
    <MetaMaskProvider>
      <ThemeProvider theme={theme}>
        <LoginView />
      </ThemeProvider>
    </MetaMaskProvider>
  );
}

function LoginView() {
  const { status, ethereum, connect } = useMetaMask();
  if (status !== "connected") {
    return <ConnectInfo onclick={connect} status={status} />;
  }

  if (status === "connected")
    return (
      <DataSourceContext.Provider
        value={EthersDataSource(new ethers.providers.Web3Provider(ethereum))}
      >
        <AccountView />
      </DataSourceContext.Provider>
    );

  return <Loading />;
}

function AccountView() {
  const dataSource = useContext(DataSourceContext);
  const { account: agent } = useMetaMask();

  const { data: account, loading } = useFetch(
    dataSource.erc423.accountOf(agent || "")
  );

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
