import { Notifications } from "components/Notifications";
import { NotificationProvider } from "context/notification";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <NotificationProvider>
      <Notifications />
      <Outlet />
    </NotificationProvider>
  );
}
