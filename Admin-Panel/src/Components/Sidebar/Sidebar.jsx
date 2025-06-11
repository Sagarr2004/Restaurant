import { Link } from "react-router-dom";
import { FaUtensils, FaClipboardList, FaUsers, FaTable } from "react-icons/fa";

const Sidebar = () => (
  <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
    <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
    <nav className="space-y-4">
      <Link to="/orders" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <FaClipboardList /> Order Management
      </Link>
      <Link to="/menu" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <FaUtensils /> Manage Menu
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

export default Sidebar;
