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

  const img = new Image();
  img.src = "/Gemini_Generated_Image_nnva12nnva12nnva.png";

  img.onload = () => {

    // create canvas for circular image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, 0, 0, size, size);

    const circularImage = canvas.toDataURL("image/png");

    // add circular logo
    doc.addImage(circularImage, "PNG", 85, 10, 30, 30);

    doc.setFontSize(18);
    doc.text("SERVICE INVOICE", 70, 50);

    doc.setFontSize(11);

    doc.text(`Invoice No: ${invoiceNo}`, 20, 65);
    doc.text(`Invoice Date: ${invoiceDate}`, 20, 72);
    doc.text(`Booking ID: ${bookingId}`, 20, 79);

    doc.text("Provider Details:", 20, 95);
    doc.text(`Company: ${provider.companyName}`, 20, 102);
    doc.text(`Name: ${provider.name}`, 20, 109);
    doc.text(`Profession: ${provider.profession}`, 20, 116);
    doc.text(`Phone: ${provider.phone}`, 20, 123);
    doc.text(`Email: ${provider.email}`, 20, 130);
    doc.text(`${provider.address}`, 20, 137);
    doc.text(`${provider.city}, ${provider.state}`, 20, 144);

    doc.text("Customer Details:", 20, 160);
    doc.text(`${customerDetails.address}`, 20, 167);
    doc.text(`${customerDetails.city}, ${customerDetails.state}`, 20, 174);
    doc.text(`Mobile: ${customerDetails.mobileNo}`, 20, 181);

    doc.text("Service Details:", 20, 197);
    doc.text(`Service: ${serviceName}`, 20, 204);
    doc.text(`Booked Time: ${bookedTime}`, 20, 211);
    doc.text(`Service Price: ₹${servicePrice}`, 20, 218);
    doc.text(`GST (18%): ₹${gstAmount.toFixed(2)}`, 20, 225);
    doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, 232);

    doc.text("Status: Confirmed", 20, 245);

    doc.save(`${invoiceNo}.pdf`);
  };
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

        {/* <div className="section-box">
          <h4>Customer Details</h4>
          <p>{customerDetails.address}</p>
          <p>{customerDetails.city}, {customerDetails.state}</p>
          <p>📞 {customerDetails.mobileNo}</p>
        </div> */}

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
          <>
            <h3 className="confirmed-text">✅ Order Confirmed</h3>

            <button
              onClick={generateInvoice}
              className="download-btn"
            >
              Download Invoice PDF
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default UserBillPage;