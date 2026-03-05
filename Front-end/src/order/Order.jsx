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
      console.log(data);
      if (Array.isArray(data)) {
        setOrders(data);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

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
      <h2 className="order-title">📦 My Orders</h2>

      <div className="tab-bar">
        <button
          className={activeTab === "active" ? "tab active" : "tab"}
          onClick={() => setActiveTab("active")}
        >
          Active Orders
        </button>

        <button
          className={activeTab === "history" ? "tab active" : "tab"}
          onClick={() => setActiveTab("history")}
        >
          Cancelled Orders
        </button>

        <button
          className={activeTab === "completed" ? "tab active" : "tab"}
          onClick={() => setActiveTab("completed")}
        >
          Completed Orders
        </button>
      </div>

      {activeTab === "active" && (
        <ActiveOrders orders={activeOrders} />
      )}

      {activeTab === "history" && (
        <OrderHistory orders={cancelledOrders} />
      )}

      {activeTab === "completed" && (
        <CompletedOrders orders={completedOrders} />
      )}
    </div>
  );
};

export default OrdersPage;
