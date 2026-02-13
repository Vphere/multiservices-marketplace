import React from "react";
import { cancelOrder } from "../utils/apiFunction";

const ActiveOrders = ({ orders }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeOrders = orders.filter((o) => {
    const d = new Date(o.slottime);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  });

  const handleCancel = async (order) => {
    const reason = window.prompt("Enter cancellation reason:");

    if (!reason) return;

    const data = {
      reason: reason,
      bookedTime: order.slottime
    };

    const res = await cancelOrder(order.email, data);

    if (res) {
      alert("Order cancelled successfully");
      window.location.reload();
    } else {
      alert("Failed to cancel order");
    }
  };

  if (activeOrders.length === 0) {
    return <p className="no-orders">No active orders</p>;
  }

  return (
    <div className="order-list">
      {activeOrders.map((o, i) => (
        <div key={i} className="order-card improved-card">

          {/* HEADER */}
          <div className="order-header">
            <h3>{o.profession}</h3>
            <span className="price">₹{o.price}</span>
          </div>

          {/* PROVIDER INFO */}
          <div className="order-section">
            <h4>👨‍🔧 Service Provider</h4>
            <div className="info-grid">
              <p><b>Company:</b> {o.companyName}</p>
              <p><b>Name:</b> {o.name}</p>
              <p><b>Email:</b> {o.email}</p>
              <p><b>Phone:</b> {o.phonenumber}</p>
              <p><b>Address:</b> {o.address}</p>
            </div>
          </div>

          {/* SLOT INFO */}
          <div className="order-section slot-section">
            <h4>⏰ Your Slot</h4>
            <div className="slot-box">
              <div>
                <span className="label">Date</span>
                <span className="value">
                  {new Date(o.slottime).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="label">Time</span>
                <span className="value">
                  {new Date(o.slottime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* CANCEL BUTTON */}
          <button
            className="cancel-btn"
            onClick={() => handleCancel(o)}
          >
            ❌ Cancel Order
          </button>

        </div>
      ))}
    </div>
  );
};

export default ActiveOrders;
