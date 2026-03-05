import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserBooking } from "../utils/apiFunction";
import jsPDF from "jspdf";
import "./UserBillPage.css";
 
const UserBillPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  if (!state) {
    navigate("/");
    return null;
  }

  const {
    bookingId,
    invoiceNo,
    invoiceDate,
    provider,
    bookedTime,
    serviceName,
    servicePrice,
    customerDetails
  } = state;

  const gstRate = 0.18;
  const gstAmount = servicePrice * gstRate;
  const totalAmount = servicePrice + gstAmount;

  const handleFinalConfirm = async () => {
    setLoading(true);

    try {
      await setUserBooking(provider.email, {
        bookedTime,
        ...customerDetails
      });

      setTimeout(() => {
        setLoading(false);
        setShowInvoice(true);
      }, 1500);
    } catch (err) {
      setLoading(false);
    }
  };

  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SERVICE INVOICE", 70, 20);

    doc.setFontSize(11);

    // Invoice Info
    doc.text(`Invoice No: ${invoiceNo}`, 20, 35);
    doc.text(`Invoice Date: ${invoiceDate}`, 20, 42);
    doc.text(`Booking ID: ${bookingId}`, 20, 49);

    // Provider Details
    doc.text("Provider Details:", 20, 65);
    doc.text(`Company: ${provider.companyName}`, 20, 72);
    doc.text(`Name: ${provider.name}`, 20, 79);
    doc.text(`Profession: ${provider.profession}`, 20, 86);
    doc.text(`Phone: ${provider.phone}`, 20, 93);
    doc.text(`Email: ${provider.email}`, 20, 100);
    doc.text(`${provider.address}`, 20, 107);
    doc.text(`${provider.city}, ${provider.state}`, 20, 114);

    // Customer Details
    doc.text("Customer Details:", 20, 130);
    doc.text(`${customerDetails.address}`, 20, 137);
    doc.text(`${customerDetails.city}, ${customerDetails.state}`, 20, 144);
    doc.text(`Mobile: ${customerDetails.mobileNo}`, 20, 151);

    // Service Section
    doc.text("Service Details:", 20, 170);
    doc.text(`Service: ${serviceName}`, 20, 177);
    doc.text(`Booked Time: ${bookedTime}`, 20, 184);
    doc.text(`Service Price: ₹${servicePrice}`, 20, 191);
    doc.text(`GST (18%): ₹${gstAmount.toFixed(2)}`, 20, 198);
    doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, 205);

    doc.text("Status: Confirmed", 20, 220);

    doc.save(`${invoiceNo}.pdf`);
  };

  return (
  <div className="bill-page">
    <div className="bill-card">

      <div className="bill-header">
        <h2>Booking Summary</h2>
      </div>

      <div className="section-box">
        <h4>Service Details</h4>
        <p><strong>Provider:</strong> {provider.name}</p>
        <p><strong>Service:</strong> {serviceName}</p>
        <p><strong>Booked Time:</strong> {bookedTime}</p>
      </div>

      <div className="section-box">
        <h4>Customer Details</h4>
        <p>{customerDetails.address}</p>
        <p>{customerDetails.city}, {customerDetails.state}</p>
        <p>📞 {customerDetails.mobileNo}</p>
      </div>

      <div className="section-box">
        <h4>Payment Summary</h4>
        <p>Service Price: ₹{servicePrice}</p>
        <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
        <div className="total-amount">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      {!showInvoice && (
        <button
          onClick={handleFinalConfirm}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? "Processing Booking..." : "Final Confirm Booking"}
        </button>
      )}

      {showInvoice && (
        <button
          onClick={generateInvoice}
          className="download-btn"
        >
          Download Invoice PDF
        </button>
      )}

    </div>
  </div>
);
};

export default UserBillPage;