import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pendingRequest, setEnabled, rejectServiceProvider } from "../utils/apiFunction";
import "./AdminRequests.css";

const AdminRequests = () => {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState("");

  const loadPendingRequests = async () => {

    setLoading(true);
    setError("");

    try {

      const data = await pendingRequest();

      if (data) {

        const list = Array.isArray(data) ? data : [data];

        list.sort((a, b) => new Date(a.time) - new Date(b.time));

        setRequests(list);

      } else {

        setMessage("No pending requests available");

      }

    } catch {

      setError("Error loading pending requests");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const handleDetails = (request) => {
    navigate("/admin/request-details", {
      state: { request }
    });
  };

  const handleAccept = async (id) => {

    const req = requests.find((r) => r.serviceId === id);
    if (!req) return;

    const confirm = window.confirm(
      "Are you sure you want to ACCEPT this service provider?"
    );

    if (!confirm) return;

    const res = await setEnabled(req.email, true);

    if (!res) {
      setNotification({
        type: "error",
        message: "Failed to approve service provider"
      });
      return;
    }

    setNotification({
      type: "success",
      message: "Service provider approved successfully"
    });

    setRequests((prev) => prev.filter((r) => r.serviceId !== id));

  };

  const handleReject = async (id) => {

    const req = requests.find((r) => r.serviceId === id);
    if (!req) return;

    const confirm = window.confirm(
      "Are you sure you want to REJECT this service provider?"
    );

    if (!confirm) return;

    const reason = window.prompt("Enter rejection reason:");

    if (!reason || reason.trim() === "") {
      alert("Rejection reason is required");
      return;
    }

    const res = await rejectServiceProvider({
      email: req.email,
      reason: reason
    });

    if (!res) {
      setNotification({
        type: "error",
        message: "Failed to reject service provider"
      });
      return;
    }

    setNotification({
      type: "warning",
      message: "Service provider rejected"
    });

    setRequests((prev) => prev.filter((r) => r.serviceId !== id));

  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (

    <div className="admin-dashboard">

      {/* Top Navbar */}
      <div className="admin-navbar">

        <div className="admin-logo">
          Urban Service Admin
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      <div className="admin-page">

        <div className="admin-card">

          <div className="admin-header">

            <h2>Pending Service Provider Requests</h2>

            <span className="count-badge">
              {requests.length}
            </span>

          </div>

          {notification && (
            <div className={`alert ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {loading && (
            <div className="loading-box">
              Loading requests...
            </div>
          )}

          {error && (
            <div className="alert error">
              {error}
            </div>
          )}

          {message && (
            <div className="alert info">
              {message}
            </div>
          )}

          {!loading && !error && requests.length === 0 && (
            <div className="empty-box">
              No pending requests found
            </div>
          )}

          {!loading && !error && requests.length > 0 && (

            <table className="request-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {requests.map((r) => (

                  <tr key={r.serviceId}>

                    <td>{r.name}</td>

                    <td>{r.email}</td>

                    <td>
                      {new Date(r.time).toLocaleString("en-IN")}
                    </td>

                    <td className="action-buttons">

                      <button
                        className="btn info"
                        onClick={() => handleDetails(r)}
                      >
                        Details
                      </button>

                      <button
                        className="btn success"
                        onClick={() => handleAccept(r.serviceId)}
                      >
                        Accept
                      </button>

                      <button
                        className="btn danger"
                        onClick={() => handleReject(r.serviceId)}
                      >
                        Reject
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>

  );

};

export default AdminRequests;