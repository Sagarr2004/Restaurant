import { useState,useEffect } from "react";
import axios from "axios";

const Reservations = () => {
  // const [reservations, setReservations] = useState([
  //   { id: 1, name: "Sagar Chavan", requestTime: "2025-02-11 14:00", reservationTime: "2025-02-11 18:30", status: "Pending" },
  //   { id: 2, name: "Soham Sangare", requestTime: "2025-02-11 14:15", reservationTime: "2025-02-11 19:00", status: "Pending" },
  //   { id: 3, name: "Vishwajeet Rupnawar", requestTime: "2025-02-11 16:15", reservationTime: "2025-02-11 18:00", status: "Pending" },
  //   { id: 4, name: "Niraj Dhakulkar", requestTime: "2025-02-11 16:15", reservationTime: "2025-02-11 18:00", status: "Pending" },
  // ]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("reservationTime");
  const [notifications, setNotifications] = useState([]);
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    fetchReservations();
}, []);

const fetchReservations = async () => {
   try {
     const response = await axios.get("http://localhost:3000/reservations", {
        withCredentials: true,
     });
     
     setFetchData(response.data);
    //  console.log("Fetched Data:", response.data);

   } catch (err) {
     console.error("Error fetching reservations:", err);
   }
};

const updateStatus = async (createdAt, newStatus) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/reservations/update`, 
      { createdAt, status: newStatus },
      { withCredentials: true }
    );

    if (response.status === 200) {
      setFetchData(prevData =>
        prevData.map(res => 
          res.createdAt === createdAt ? { ...res, status: newStatus } : res
        )
      );

      const updatedRes = fetchData.find(res => res.createdAt === createdAt);
      if (updatedRes) {
        setNotifications(prevNotifications => [
          ...prevNotifications,
          {
            message: `${updatedRes.firstName}'s reservation is now ${newStatus}`,
            color: newStatus === "Rejected" ? "text-red-500" : "text-green-500"
          }
        ]);
      }
    }
  } catch (err) {
    console.error("Error updating reservation status:", err);
  }
};



  // Sorting Logic
  const sortedReservations = [...fetchData].sort((a, b) => {
    if (sortBy === "name") return a.firstName.localeCompare(b.firstName);
    if (sortBy === "requestTime") return new Date(a.time || 0) - new Date(b.time || 0);
    if (sortBy === "reservationTime") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);    
    return 0;
  });

  return (
    <div className="p-5 text-xl">
      <h2 className="mb-4">Manage Reservations</h2>
      <div className="flex justify-between gap-2 mb-4">
        <select className="p-1 text-sm border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select className="p-1 text-sm border rounded" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="reservationTime">Sort by Reservation Time</option>
          <option value="requestTime">Sort by Request Time</option>
        </select>
      </div>
      <ul>
        {sortedReservations
          .filter(res => filter === "All" || res.status === filter)
          .map(res => (
            <li key={res.id} className="flex justify-between p-2 border-b text-sm">
              <div>
              <p><strong>{res.firstName}</strong> - Reservation Time: {new Date(res.createdAt).toLocaleString()}</p>
                <p className="text-gray-600"><strong>Request Time: </strong>{res.time}</p>
                <p className="text-gray-600"><strong>Status: <span className={res.status === "Rejected" ? "text-red-500" : res.status === "Accepted" ? "text-green-500" : ""}>{res.status}</span></strong></p>
              </div>
              {res.status === "Pending" && (
                <div className="flex gap-2">
                  <button onClick={() => {updateStatus(res.createdAt, "Accepted")}} className="bg-green-500 text-white p-1 h-10 w-15 text-xs rounded">Accept</button>
                  <button onClick={() => {updateStatus(res.createdAt, "Rejected")}} className="bg-red-500 text-white p-1 h-10 w-15 text-xs rounded">Reject</button>
                </div>
              )}
            </li>
          ))}
      </ul>
      {notifications.length > 0 && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
          <h3 className="text-sm font-bold">Notifications</h3>
          <ul className="text-sm">
            {notifications.map((note, index) => (
              <li key={index} className={note.color}>- {note.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Reservations;
