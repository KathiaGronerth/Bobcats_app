import React from "react";
import Footer from "./Footer";
import FindRideForm from "./FindRideForm";
import Search from "./ride/Search";
import backgroundImage from "../../assets/images/background1.png";
import { SiGooglemaps } from "react-icons/si";

const Home = () => {
  return (
    <div className="content-wrapper">
      <section className="hero">
        <h1>Welcome to Bobcat Carpool</h1>
        <p>
          Your sustainable ride-sharing solution for the Texas State University
          community.
        </p>
        <button className="cta-btn">Join Us Today!</button>
      </section>
      <div className="tag">
        <img
          src={backgroundImage}
          alt="Bobcat Carpool Logo"
          style={{ width: "100%", height: "auto" }}
        />
        <h2 className="tagline">
          Sharing Journeys, Creating Connections{" "}
          <SiGooglemaps
            style={{ width: "25px", height: "auto", color: "#98ed64" }}
          />
        </h2>
        <div className="tagline1">Request a ride, hop in, and go.</div>
      </div>

      <Search />
      <section className="stats">
        <h2 className="title">Our Impact</h2>
        <div className="statistics">
          <div className="stat-item">
            <strong>15,000+</strong>
            <p>Rides Shared</p>
          </div>
          <div className="stat-item">
            <strong>5,000+</strong>
            <p>Happy Users</p>
          </div>
          <div className="stat-item">
            <strong>10,000+</strong>
            <p>Tons CO2 Saved</p>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h2 className="title">What Our Users Say</h2>
        <div className="testimonial-card">
          <p>"The best ride-sharing experience I've had!"</p>
          <cite>- Jane Doe, Student</cite>
        </div>
        {/* You can add more testimonial cards here */}
      </section>
      <Footer />
    </div>
  );
};

export default Home;
