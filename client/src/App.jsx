import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateEmployee from "./pages/CreateEmployee";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-employee" element={<CreateEmployee />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
