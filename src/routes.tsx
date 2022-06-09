import AppLayout from "components/App";
import { DashboardLayout } from "components/Dashboard";
import Assets from "components/Dashboard/Assets";
import { ExplorerLayout } from "components/Blockchain";
import { Explorer } from "components/Blockchain/Explorer";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Assets />} />
          </Route>

          <Route element={<ExplorerLayout />}>
            <Route path="asset/:asset_id" element={<Explorer />} />
            <Route path="cert/:cert_id" element={<></>} />
          </Route>
          
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

const NoMatch = () => <Navigate to="/dashboard" />;
