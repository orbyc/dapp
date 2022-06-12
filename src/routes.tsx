import AppLayout from "components/App";
import { DashboardLayout } from "components/Dashboard";
import Assets from "components/Dashboard/Assets";
import Certificates from "components/Dashboard/Certificates";
import Movements from "components/Dashboard/Movements";
import { ExplorerLayout } from "components/Explorer";
import { Explorer } from "components/Explorer/Explorer";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Assets />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="movements" element={<Movements />} />
          </Route>
          <Route element={<ExplorerLayout />}>
            <Route index element={<Explorer />} />
          </Route>
        </Route>
        <Route index element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

const NoMatch = () => <Navigate to="/dashboard" />;
