import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './Components/Sidebar/Sidebar'
import Dashboard from "./Components/Dashboard/Dashboard";
import ManageMenu from "./Components/ManageMenu/Manage";
import OrderManagement from "./Components/OrderManagament/OrderManagement.jsx";
import Reservations from "./Components/Reservation/Reservations.jsx";
import Users from "./Components/UserManagement/Users.jsx"

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<ManageMenu />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
