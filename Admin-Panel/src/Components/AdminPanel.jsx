import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaUtensils, FaClipboardList, FaUsers, FaTable } from "react-icons/fa";

const Sidebar = () => (
  <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
    <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
    <nav className="space-y-4">
      <Link to="/menu" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <FaUtensils /> Manage Menu
      </Link>
      <Link to="/orders" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <FaClipboardList /> Order Management
      </Link>
      <Link to="/reservations" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <FaTable /> Reservations
      </Link>
      <Link to="/users" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <FaUsers /> User Management
      </Link>
    </nav>
  </div>
);

const Dashboard = () => <div className="p-5 text-xl">Welcome to Admin Dashboard</div>;
const ManageMenu = () => <div className="p-5 text-xl">Manage Menu Page</div>;
const OrderManagement = () => <div className="p-5 text-xl">Order Management Page</div>;
const Reservations = () => <div className="p-5 text-xl">Reservations Page</div>;
const Users = () => <div className="p-5 text-xl">User Management Page</div>;

export default function AdminPanel() {
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
