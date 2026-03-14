import { Navigate, Route, Routes } from "react-router-dom";
import CaterersPage from "./pages/CaterersPage";

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/caterers" replace />} />
    <Route path="/caterers" element={<CaterersPage />} />
  </Routes>
);

export default App;
