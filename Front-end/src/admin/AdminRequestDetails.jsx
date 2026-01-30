import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setEnabled } from "../utils/apiFunction";

const AdminRequestDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const request = state?.request;

  const [previewImage, setPreviewImage] = useState(null);
  const [notification, setNotification] = useState(null);

  if (!request) {
    return <h4 className="text-center mt-5">No Data Found</h4>;
  }

  // ================= ACCEPT =================
  const handleAccept = async () => {
    const confirm = window.confirm(
      "Are you sure you want to ACCEPT this service provider?"
    );

    if (!confirm) return;

    const res = await setEnabled(request.email, true);

    if (res) {
      setNotification({
        type: "success",
        message: "Service provider approved successfully ✅"
      });

      setTimeout(() => {
        navigate("/admin/request");
      }, 1500);
    }
  };

  // ================= REJECT =================
  const handleReject = async () => {
    const confirm = window.confirm(
      "Are you sure you want to REJECT this service provider?"
    );

    if (!confirm) return;

    const res = await setEnabled(request.email, false);

    if (res) {
      setNotification({
        type: "danger",
        message: "Service provider rejected ❌"
      });

      setTimeout(() => {
        navigate("/admin/request");
      }, 1500);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Service Provider Details</h3>

      {/* 🔔 NOTIFICATION */}
      {notification && (
        <div className={`alert alert-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="card p-3">
        <p><b>Name:</b> {request.name}</p>
        <p><b>Email:</b> {request.email}</p>
        <p><b>Phone:</b> {request.phonenumber}</p>
        <p><b>Address:</b> {request.address}</p>
        <p><b>Category:</b> {request.categories}</p>
        <p><b>Experience:</b> {request.years} years</p>
        <p><b>City:</b> {request.city}</p>
        <p><b>State:</b> {request.state}</p>

        <p><b>Services:</b></p>
        <ul>
          {request.servicelist.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <p><b>Home Service:</b> {request.homeService ? "Yes" : "No"}</p>
        <p><b>Reach Workplace:</b> {request.reachWorkplace ? "Yes" : "No"}</p>

        {/* IMAGES */}
        <div className="row mt-3 text-center">
          <div className="col">
            <label><b>Profile Photo:</b></label><br />
            <img
              src={`data:image/jpeg;base64,${request.profilePic}`}
              alt="profile"
              width="200"
              className="img-thumbnail"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setPreviewImage(`data:image/jpeg;base64,${request.profilePic}`)
              }
            />
          </div>

          <div className="col">
            <label><b>Document:</b></label><br />
            <img
              src={`data:image/jpeg;base64,${request.documentPic}`}
              alt="document"
              width="200"
              className="img-thumbnail"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setPreviewImage(`data:image/jpeg;base64,${request.documentPic}`)
              }
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-4">
          <button className="btn btn-success me-3" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn btn-danger" onClick={handleReject}>
            Reject
          </button>
        </div>
      </div>

      {/* FULL SCREEN IMAGE PREVIEW */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px"
            }}
          />

          <button
            onClick={() => setPreviewImage(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "30px",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminRequestDetails;
