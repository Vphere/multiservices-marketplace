import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setEnabled, rejectServiceProvider } from "../utils/apiFunction";
import "./AdminRequestDetails.css";

const AdminRequestDetails = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const request = state?.request;

  const [previewImage, setPreviewImage] = useState(null);
  const [notification, setNotification] = useState(null);

  if (!request) {
    return <h4 className="empty-text">No Data Found</h4>;
  }

  // ✅ ACCEPT (same as AdminRequests)
  const handleAccept = async () => {

    const confirm = window.confirm(
      "Are you sure you want to ACCEPT this service provider?"
    );

    if (!confirm) return;

    const res = await setEnabled(request.email, true);

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

    setTimeout(() => {
      navigate("/admin/request");
    }, 1500);
  };

  // ✅ REJECT (same as AdminRequests)
  const handleReject = async () => {

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
      email: request.email,
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

    setTimeout(() => {
      navigate("/admin/request");
    }, 1500);
  };

  return (
    <div className="admin-details-page">

      <div className="details-card">

        <div className="details-header">
          <h2>Service Provider Details</h2>
          <button
            className="back-btn"
            onClick={() => navigate("/admin/request")}
          >
            ← Back
          </button>
        </div>

        {notification && (
          <div className={`alert ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="details-grid">
          <p><b>Name:</b> {request.name}</p>
          <p><b>Email:</b> {request.email}</p>
          <p><b>Phone:</b> {request.phonenumber}</p>
          <p><b>Experience:</b> {request.years} years</p>
          <p><b>Category:</b> {request.categories}</p>
          <p><b>City:</b> {request.city}</p>
          <p><b>State:</b> {request.state}</p>
          <p><b>Address:</b> {request.address}</p>
          <p><b>Home Service:</b> {request.homeService ? "Yes" : "No"}</p>
          <p><b>Reach Workplace:</b> {request.reachWorkplace ? "Yes" : "No"}</p>
        </div>

        <div className="service-section">
          <h4>Services Provided</h4>
          <ul className="service-list">
            {request.servicelist.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="image-section">
          <div className="image-card">
            <h5>Profile Photo</h5>
            <img
              src={`data:image/jpeg;base64,${request.profilePic}`}
              alt="profile"
              onClick={() =>
                setPreviewImage(`data:image/jpeg;base64,${request.profilePic}`)
              }
            />
          </div>

          <div className="image-card">
            <h5>Document</h5>
            <img
              src={`data:image/jpeg;base64,${request.documentPic}`}
              alt="document"
              onClick={() =>
                setPreviewImage(`data:image/jpeg;base64,${request.documentPic}`)
              }
            />
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn accept" onClick={handleAccept}>
            Accept
          </button>

          <button className="btn reject" onClick={handleReject}>
            Reject
          </button>
        </div>

      </div>

      {previewImage && (
        <div
          className="image-preview"
          onClick={() => setPreviewImage(null)}
        >
          <img src={previewImage} alt="preview" />
        </div>
      )}

    </div>
  );
};

export default AdminRequestDetails;