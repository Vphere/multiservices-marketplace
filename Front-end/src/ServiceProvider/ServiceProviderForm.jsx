import React, { useEffect, useState } from "react";
import { serviceProviderform, userCheck } from "../utils/apiFunction";
import { useNavigate } from "react-router-dom";
import "./ServiceProviderForm.css";

const ServiceProviderForm = () => {
  const navigate = useNavigate();

  const func = async () => {
    const data = await userCheck();
    if (data) {
      navigate("/PendingRequest");
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    years: "",
    categories: "",
    companyName: "",
    profession: "",
    price: ""
  });

  const [servicelist, setServicelist] = useState([]);
  const [serviceInput, setServiceInput] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [documentPic, setDocumentPic] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pinError, setPinError] = useState("");

  const [homeService, setHomeService] = useState(false);
  const [reachWorkplace, setReachWorkplace] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleDocumentPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentPic(file);
      if (file.type.startsWith("image/")) {
        setDocumentPreview(URL.createObjectURL(file));
      }
    }
  };

  const addService = () => {
    if (serviceInput.trim()) {
      setServicelist([...servicelist, serviceInput.trim()]);
      setServiceInput("");
    }
  };

  const removeService = (index) => {
    setServicelist(servicelist.filter((_, i) => i !== index));
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setPincode(value);
    setCity("");
    setStateName("");
    setPinError("");

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();

        if (data[0].Status === "Success") {
          setCity(data[0].PostOffice[0].District);
          setStateName(data[0].PostOffice[0].State);
        } else {
          setPinError("Invalid Pincode");
        }
      } catch {
        setPinError("Unable to fetch pincode");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePic || !documentPic) {
      setMessage("Please upload profile & document");
      return;
    }

    if (servicelist.length === 0) {
      setMessage("Please add at least one service");
      return;
    }

    const data = new FormData();

    data.append("profilePic", profilePic);
    data.append("documentPic", documentPic);
    data.append("name", formData.name);
    data.append("phonenumber", formData.phonenumber);
    data.append("address", formData.address);
    data.append("years", formData.years);
    data.append("categories", formData.categories);
    data.append("city", city);
    data.append("state", stateName);
    data.append("servicelist", servicelist.join(","));
    // data.append("companyName", formData.companyName);
    // data.append("profession", formData.profession);
    // data.append("price", Number(formData.price)); // ✅ PRICE ADDED

    try {
      await serviceProviderform(
        data,
        homeService,
        reachWorkplace,
        formData.companyName,
        formData.profession,
        formData.price
      );
      setMessage("Profile saved successfully");
    } catch (err) {
      setMessage("User already exists or unauthorized");
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const role = localStorage.getItem("userRole");

  //   if (!token || !role || !(role.includes("ROLE_SERVICE") || role.includes("ROLE_ADMIN"))) {
  //     navigate("/login");
  //   }
  //   func();
  // }, [navigate]);

  return (
    <div className="service-provider-form-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">

              <h3 className="fw-bold">Become a Service Partner</h3>
              <p className="text-muted">
                Email: <b>{localStorage.getItem("userId")}</b>
              </p>

              <form onSubmit={handleSubmit}>

                <div className="row mb-3">
                  <div className="col">
                    <label>Profile Photo</label>
                    <input type="file" className="form-control" onChange={handleProfilePicChange} />
                    {profilePreview && <img src={profilePreview} className="img-thumbnail mt-2" alt="profile" />}
                  </div>

                  <div className="col">
                    <label>Document</label>
                    <input type="file" className="form-control" onChange={handleDocumentPicChange} />
                    {documentPreview && <img src={documentPreview} className="img-thumbnail mt-2" alt="doc" />}
                  </div>
                </div>

                <input className="form-control mb-2" name="name" placeholder="Full Name" onChange={handleChange} required />
                <input className="form-control mb-2" name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                <input className="form-control mb-2" name="phonenumber" placeholder="Phone Number" onChange={handleChange} required />
                <input className="form-control mb-2" name="address" placeholder="Address" onChange={handleChange} required />

                <div className="row mb-2">
                  <div className="col">
                    <input className="form-control" placeholder="Pincode" value={pincode} onChange={handlePincodeChange} maxLength={6} />
                    {pinError && <small className="text-danger">{pinError}</small>}
                  </div>
                  <div className="col">
                    <input className="form-control" value={city} placeholder="City" disabled />
                  </div>
                  <div className="col">
                    <input className="form-control" value={stateName} placeholder="State" disabled />
                  </div>
                </div>

                <input className="form-control mb-2" name="years" type="number" placeholder="Experience (years)" onChange={handleChange} required />

                <input
                  className="form-control mb-2"
                  name="price"
                  type="number"
                  placeholder="Service Price (₹)"
                  onChange={handleChange}
                  required
                />

                <select className="form-select mb-3" name="categories" onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Home Services">Home Services</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Arts & Recreation">Arts & Recreation</option>
                </select>

                <input className="form-control mb-2" name="companyName" placeholder="Company Name" onChange={handleChange} />
                <input className="form-control mb-3" name="profession" placeholder="Profession" onChange={handleChange} />

                <div className="mb-3">
                  <label className="fw-semibold">Service Availability</label>

                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={homeService} onChange={(e) => setHomeService(e.target.checked)} />
                    <label className="form-check-label">Home Service Available</label>
                  </div>

                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={reachWorkplace} onChange={(e) => setReachWorkplace(e.target.checked)} />
                    <label className="form-check-label">Can Reach Client Workplace</label>
                  </div>
                </div>

                <div className="input-group mb-2">
                  <input className="form-control" placeholder="Add service" value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} />
                  <button type="button" className="btn btn-outline-primary" onClick={addService}>
                    Add
                  </button>
                </div>

                <div className="mb-3">
                  {servicelist.map((s, i) => (
                    <span key={i} className="badge bg-secondary me-2">
                      {s}
                      <button type="button" className="btn-close ms-2" onClick={() => removeService(i)} />
                    </span>
                  ))}
                </div>

                <button className="btn btn-primary w-100">Submit Profile</button>
              </form>

              {message && <div className="alert alert-info mt-3">{message}</div>}

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ServiceProviderForm;
