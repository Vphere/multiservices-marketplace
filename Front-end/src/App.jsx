import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from './auth/Login'
import Signup from './auth/Signup'
import Verify from './auth/Verify'
import Logout from './auth/Logout'
import ServiceForm from './booking/ServiceForm'
import Navbar from "./components/Navbar";
import ServiceProviderForm from "./ServiceProvider/ServiceProviderForm";
import Pending from "./errorpages/pending";
import AdminRequests from "./admin/AdminRequests";
import AdminRequestDetails from "./admin/AdminRequestDetails";
import ServiceListingHomeService from "./pages/ServiceListingHomeService";
import ServiceListingBeauty from "./pages/ServiceListingBeauty";
import BookService from "./ServiceProvider/BookService";
import ServiceProvider from "./ServiceProvider/ServiceProvider";
import LoginError from "./errorpages/loginerror";
import ServiceError from "./errorpages/ServiceError";
import ServiceListingFitness from "./pages/ServiceListingFitness";
import ServiceListingArtAndRecreation from "./pages/ServiceListingArtAndRecreation";
import BookingModal from "./components/BookingModal";
import EditBooking from "./ServiceProvider/EditBooking";
import RemoveBooking from "./ServiceProvider/RemoveBooking";
import Order from "./order/order";

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/service-form" element={<ServiceForm />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/services/home-services" element={<ServiceListingHomeService />} />
              <Route path="/services/beauty" element={<ServiceListingBeauty />} />
              <Route path="/serviceProviderForm" element={<ServiceProviderForm />} />
              <Route path="/PendingRequest" element={<Pending />} />
              <Route path="/admin/request" element={<AdminRequests />} />
              <Route path="/admin/request-details" element={<AdminRequestDetails />} />
              <Route path="/services/bookService" element={<BookService />} />
              <Route path="/services/editService" element={<ServiceProvider />} />
              <Route path="/loginerror" element={<LoginError />} />
              <Route path="/serviceerror" element={<ServiceError />} />
              <Route path="/services/fitness" element={<ServiceListingFitness/>} />
              <Route path="/services/arts-recreation" element={<ServiceListingArtAndRecreation/>} />
              <Route path="/book-slot" element={<BookingModal/>} />
              <Route path="/services/editbooking" element={<EditBooking/>} />
              <Route path="/services/removebooking" element={<RemoveBooking/>} />
              <Route path="/user/order" element={<Order/>} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;
