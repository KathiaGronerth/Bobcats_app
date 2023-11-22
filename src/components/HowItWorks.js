import React from "react";
import { FaAddressBook } from "react-icons/fa6";

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>
        How Bobcat Carpool Works{" "}
        <FaAddressBook style={{ color: "#98ed64", margin: "5px" }} />
      </h2>
      <ol>
        <li>
          Register on the platform using your Texas State University
          credentials.
        </li>
        <li>
          Post a ride by specifying your route, time, and available seats or
          search for available rides.
        </li>
        <li>
          Connect with other members of the community to carpool together.
        </li>
        <li>
          Travel sustainably and efficiently while building connections within
          the community.
        </li>
      </ol>
      <img
        src="path_to_how_it_works_image.jpg"
        alt="How It Works Illustration"
      />
    </div>
  );
};

export default HowItWorks;
