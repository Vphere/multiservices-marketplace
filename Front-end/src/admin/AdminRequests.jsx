import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pendingRequest, setEnabled } from "../utils/apiFunction";

const AdminRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const [message,setMessage] = useState("");
  
  const loadPendingRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await pendingRequest();
      console.log(data);
      if (data) {
        setRequests(Array.isArray(data) ? data : [data]);
      } else {
        setMessage("no Pending-Request available");
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

  // ================= ACTIONS =================
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
        type: "danger",
        message: "Failed to approve service provider"
      });
      return;
    }

    setNotification({
      type: "success",
      message: "Service provider approved successfully ✅"
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

    const res = await setEnabled(req.email, false);
    if (!res) {
      setNotification({
        type: "danger",
        message: "Failed to reject service provider"
      });
      return;
    }

    setNotification({
      type: "warning",
      message: "Service provider rejected ❌"
    });

    setRequests((prev) => prev.filter((r) => r.serviceId !== id));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Pending Service Provider Requests</h3>

      {notification && (
        <div className={`alert alert-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {loading && <div className="alert alert-info">Loading...</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      {message && <div className="alert alert-success mt-3">{message}</div>}
      
      {!loading && !error && requests.length === 0 && (
        <div className="alert alert-warning">
          No pending requests found
        </div>
      )}

      {!loading && !error && requests.length > 0 && (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th style={{ width: "260px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.serviceId}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleDetails(r)}
                  >
                    Details
                  </button>

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAccept(r.serviceId)}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
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
  );
};

export default AdminRequests;
