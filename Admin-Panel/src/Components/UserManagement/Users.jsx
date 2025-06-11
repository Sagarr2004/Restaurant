import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Sagar Chavan", email: "sagar@example.com", phone: "1234567890", status: "Active", orders: 5, reservations: 2, feedback: "Great service!" },
    { id: 2, name: "Soham Sangare", email: "soham@example.com", phone: "9876543210", status: "Inactive", orders: 3, reservations: 1, feedback: "Loved the food!" },
  ]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  
  const toggleStatus = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user));
  };
  
  const exportData = () => {
    const csvContent = ["Name,Email,Phone,Status,Orders,Reservations,Feedback"].concat(
      users.map(user => `${user.name},${user.email},${user.phone},${user.status},${user.orders},${user.reservations},${user.feedback}`)
    ).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="p-5 text-xl">
      <h2 className="mb-4">User Management</h2>
      <div className="flex justify-between gap-2 mb-10">
        <input
          type="text"
          placeholder="Search by name"
          className="p-1 text-sm border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="p-1 text-sm border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={exportData} className="bg-blue-500 text-white p-1 text-sm rounded">Export Data</button>
      </div>
      <ul>
        {users
          .filter(user => user.name.toLowerCase().includes(search.toLowerCase()) && (filter === "All" || user.status === filter))
          .map(user => (
            <li key={user.id} className="flex justify-between p-2 border-b text-sm">
              <div>
                <p><strong>{user.name}</strong> - {user.email} - {user.phone}</p>
                <p className="text-gray-600">Orders: {user.orders} | Reservations: {user.reservations}</p>
                <p className="text-gray-600">Feedback: {user.feedback}</p>
                <p className={`text-sm ${user.status === "Inactive" ? "text-red-500" : "text-green-500"}`}><strong>Status: {user.status}</strong></p>
              </div>
              <button onClick={() => toggleStatus(user.id)} className={`p-1 text-xs rounded ${user.status === "Active" ? "bg-red-500 h-10 w-15 text-white" : "bg-green-500 h-10 w-15 text-white"}`}>
                {user.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserManagement;