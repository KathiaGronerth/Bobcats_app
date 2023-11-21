import React from "react";
import backgroundImage from "../../assets/images/background.png";
import Footer from "../components/Footer";
import { IoMdMail } from "react-icons/io";

const ContactForm = () => {
  return (
    <div className="contact-form">
      <form className="card-form">
        <h2>
          Contact Us{" "}
          <IoMdMail
            style={{
              color: "#98ed64",
              width: "20px",
              height: "auto",
            }}
          />
        </h2>
        <input type="text" placeholder="Name" className="contact-name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
      <Footer />
    </div>
  );
};

export default ContactForm;
