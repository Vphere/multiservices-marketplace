import React, { useEffect, useState } from "react";
import { getBookingServices } from "../utils/apiFunction";
import ActiveOrders from "./ActiveOrders";
import OrderHistory from "./OrderHistory";
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

  return (
    <div className="order-container">
      <h2 className="order-title">📦 My Orders</h2>

      {/* 🔘 TABS */}
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
          Order History
        </button>
      </div>

      {activeTab === "active" ? (
        <ActiveOrders orders={orders} />
      ) : (
        <OrderHistory orders={orders} />
      )}
    </div>
  );
};

export default OrdersPage;
