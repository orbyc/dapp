import { ExplorerLayout } from "layouts/ExplorerLayout";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/asset/:asset_id" element={<ExplorerLayout />} />
        <Route path="/cert/:cert_id" element={<></>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

const NoMatch = () => <Navigate to="/" />;
