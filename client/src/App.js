import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Navbar style />
      <Header type="list" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/taxi" element={<Taxi />} />
        <Route path="/taxi-booking/:id" element={<TaxiBooking />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
