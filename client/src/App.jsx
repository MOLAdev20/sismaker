import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import DetailEmployee from "./pages/DetailEmployee";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AccountSetting from "./pages/AccountSetting";

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-employee" element={<CreateEmployee />} />
      <Route path="/detail-employee/:id" element={<DetailEmployee />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />} />
      <Route path="/account-settings" element={<AccountSetting />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
