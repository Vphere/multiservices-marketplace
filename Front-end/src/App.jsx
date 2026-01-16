import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ServiceListing from './pages/ServiceListing'
import './App.css'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Verify from './auth/Verify'
import { AuthProvider } from './auth/AuthProvider'
import Logout from './auth/Logout'
import ServiceForm from './booking/ServiceForm'

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/service-form" element={<ServiceForm />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="/services/:category" element={<ServiceListing />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  )
}

export default App

