import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateCar from "./components/CreateCar";
import CreateRide from "./components/CreateRide";
import SearchRides from "./components/SearchRides";
import ChatComponent from "./components/chat/ChatComponent";
import UserFeedback from "./components/UserFeedback";
import FindRideForm from "./components/FindRideForm";
import RegisterAsDriverForm from "./components/RegisterAsDriverForm";
import PostRideForm from "./components/PostRideForm";
import ContactForm from "./components/ContactForm";
import FAQ from "./components/FAQ";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import LoginRegister from "./components/LoginRegister";
import UserProfile from "./components/UserProfile";
import DriverProfile from "./components/DriverProfile";
import Calendar from "./components/calendar/Calendar";
import Search from "./components/ride/Search";
import RidesPage from "./components/ride/RidesPage";
import Register from "./components/Register";
import RideOptionsPage from "./components/rideoption/RideOptionsPage";
import RequestToBook from "./components/ride/RequestToBook";
import RideList from "./components/RideList";
import RideHistory from "./components/ride/PassengerHistory";
import DriverHistory from "./components/ride/DriverHistory";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/create-car" element={<CreateCar />} />
      <Route path="/create-ride" element={<CreateRide />} />
      <Route path="/search-rides" element={<SearchRides />} />
      <Route path="/chat" element={<ChatComponent />} />
      <Route path="/feedback" element={<UserFeedback />} />
      <Route path="/find-ride-form" element={<FindRideForm />} />
      <Route path="/post-ride-form" element={<PostRideForm />} />
      <Route
        path="/register-as-driver-form"
        element={<RegisterAsDriverForm />}
      />
      <Route path="/driver-profile" element={<DriverProfile />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/search" element={<Search />} />
      <Route path="/rides" element={<RidesPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/rideoption" element={<RideOptionsPage />} />
      <Route path="/requesttobook" element={<RequestToBook />} />
      <Route path="/ridelist" element={<RideList />} />
      <Route path="/passengerhistory" element={<RideHistory />} />
      <Route path="/driverhistory" element={<DriverHistory />} />
      {/* You can also add a 404 route here if you like */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default MainRoutes;
