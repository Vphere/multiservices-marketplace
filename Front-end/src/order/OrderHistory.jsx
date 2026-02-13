import React from "react";

const OrderHistory = ({ orders }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const historyOrders = orders.filter((o) => {
    const d = new Date(o.slottime);
    d.setHours(0, 0, 0, 0);
    return d < today;
  });

  if (historyOrders.length === 0) {
    return <p className="no-orders">No order history</p>;
  }

  return (
    <div className="order-list">
      {historyOrders.map((o, i) => (
        <div key={i} className="order-card improved-card history-card">

          {/* HEADER */}
          <div className="order-header history-header">
            <h3>{o.profession}</h3>
            <span className="price muted">₹{o.price}</span>
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
          <div className="order-section slot-section history-slot">
            <h4>📅 Completed Slot</h4>
            <div className="slot-box history-box">
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

        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
