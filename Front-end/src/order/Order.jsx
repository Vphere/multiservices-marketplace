import React, { useEffect, useState } from "react";
import { getBookingServices } from "../utils/apiFunction";
import ActiveOrders from "./ActiveOrders";
import OrderHistory from "./OrderHistory";
import CompletedOrders from "./CompletedOrders";
import "./Order.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getBookingServices();
      if (Array.isArray(data)) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const activeOrders = orders.filter(
    (order) => order.enabled === true && order.completed === false
  );

  const cancelledOrders = orders.filter(
    (order) => order.enabled === false && order.completed === false
  );

  const completedOrders = orders.filter(
    (order) => order.enabled === false && order.completed === true
  );

  return (
    <div className="order-container">

      <h1 className="order-title">📦 My Orders</h1>

      <div className="tab-bar">
        <button
          className={`tab ${activeTab === "active" ? "active" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>

        <button
          className={`tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Cancelled
        </button>

        <button
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      <div className="order-content">
        {activeTab === "active" && <ActiveOrders orders={activeOrders} />}
        {activeTab === "history" && <OrderHistory orders={cancelledOrders} />}
        {activeTab === "completed" && <CompletedOrders orders={completedOrders} />}
      </div>
    </div>
  );
};

export default OrdersPage;