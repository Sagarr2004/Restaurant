import { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: ordersData } = await axios.get(
        "http://localhost:3000/orders",
        {
          withCredentials: true,
        }
      );

      if (Array.isArray(ordersData)) {
        const userIds = [...new Set(ordersData.map((order) => order.userId))];

        const userResponses = await Promise.all(
          userIds.map((userId) =>
            axios
              .get(`http://localhost:3000/users/${userId}`, {
                withCredentials: true,
              })
              .catch(() => null)
          )
        );

        const userMap = userResponses.reduce((acc, response, index) => {
          if (response && response.data) {
            acc[userIds[index]] = response.data.name;
          }
          return acc;
        }, {});

        const ordersWithUserNames = ordersData.map((order) => ({
          ...order,
          userName: userMap[order.userId] || "Unknown User",
          status: order.status || "pending", // Ensure the status is set from the database
        }));

        setOrders(ordersWithUserNames);
      } else {
        console.error("Invalid data format:", ordersData);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/update-status/${id}`, // Use 'id' instead of 'orderId'
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Order updated:", response.data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
      setNotifications((prev) => [
        ...prev,
        { message: `Order #${id} status changed to ${newStatus}` },
      ]);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    setOrders((prevOrders) =>
      [...prevOrders].sort((a, b) => {
        if (sortBy === "date-newest")
          return new Date(b.orderDate) - new Date(a.orderDate);
        if (sortBy === "date-oldest")
          return new Date(a.orderDate) - new Date(b.orderDate);
        if (sortBy === "amount-high") return b.totalAmount - a.totalAmount;
        if (sortBy === "amount-low") return a.totalAmount - b.totalAmount;
        return 0;
      })
    );
  }, [sortBy]);

  return (
    <div className="p-5 text-xl">
      <h2 className="mb-4">Order Management</h2>
      <div className="flex justify-between items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by User ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-1 text-sm border rounded w-1/3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-1 text-sm border rounded w-1/3"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-1 text-sm border rounded w-1/3"
        >
          <option value="">Sort By</option>
          <option value="date-newest">Order Date (Newest)</option>
          <option value="date-oldest">Order Date (Oldest)</option>
          <option value="amount-high">Total Amount (High to Low)</option>
          <option value="amount-low">Total Amount (Low to High)</option>
        </select>
      </div>
      <ul>
        {orders.map((order) => (
          <li
            key={order._id}
            className="flex justify-between items-center p-2 border-b text-sm"
          >
            <div>
              <h3 className="font-bold">Order #{order._id}</h3>
              {/* <p>User ID: {order.userId || "N/A"}</p> */}
              <p>
                User Name: <strong>{order.userName || "N/A"}</strong>
              </p>
              <p>Items: {order.items.map((item) => item.name).join(", ")}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p>
                Status: <span className="font-semibold">{order.status}</span>
              </p>
            </div>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="p-1 text-sm border rounded"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>

      <div className="mt-5 p-3 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Order Tracking Notifications</h3>
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-600">No notifications yet</p>
        ) : (
          <ul>
            {notifications.map((note, index) => (
              <li key={index} className="text-sm text-blue-500">
                {note.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
