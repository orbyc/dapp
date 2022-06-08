import App from "components/App";
import { Dashboard } from "components/Dashboard";
import Assets from "components/Dashboard/Assets";
import { ExplorerLayout } from "layouts/ExplorerLayout";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Assets />} />
          </Route>
          
          <Route path="asset/:asset_id" element={<ExplorerLayout />} />
          <Route path="cert/:cert_id" element={<></>} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

const NoMatch = () => <Navigate to="/dashboard" />;
