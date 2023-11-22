import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";

import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Taxi from "./pages/taxis/Taxi";
import TaxiBooking from "./pages/taxis/TaxiBooking";
import ContactUs from "./pages/ContactUs/ContactUs";
import Profile from "./pages/profile/profile";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Orders from "./pages/profile/orders";
import AdminDashboard from "./admin/adminDashBoard";
import Stripe from "./pages/payment/Stripe";
import AddTaxi from "./pages/taxis/AddTaxi";
import TourBooking from "./pages/group-tours/TourBooking";
import Tour from "./pages/group-tours/Tour";
import AddTour from "./pages/group-tours/AddTour";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const adminPage = location.pathname === "/admin-dashboard";
  return (
    <div>
      {isLoginPage ? null : <Navbar style />}
      {isLoginPage ? null : <Header type="list" />}

      {/* <Navbar style /> */}
      {/* <Header type="list" /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/add-tour" element={<AddTour />} />
        <Route path="/taxi" element={<Taxi />} />
        <Route path="/add-taxi" element={<AddTaxi />} />
        <Route path="/tour-booking/:id" element={<TourBooking />} />
        <Route path="/payment" element={<Stripe />} />
        <Route path="/taxi-booking/:id" element={<TaxiBooking />} />
      </Routes>
      {isLoginPage ? null : <Footer style />}
    </div>
  );
}

export default App;
