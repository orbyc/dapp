import { Outlet } from "react-router-dom";
import { MetaMaskProvider, useMetaMask } from "metamask-react";
import { Navigation } from "./components/Navigation";

export function DashboardLayout() {
  return (
    <MetaMaskProvider>
      <LoginView />
    </MetaMaskProvider>
  );
}

export function LoginView() {
  const { status, connect } = useMetaMask();

  if (status === "initializing") return <div>Synchronization with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available</div>;

  if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>;

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected")
    return (
      <div>
        <Navigation />
        <Outlet />
      </div>
    );

  return <></>;
}
