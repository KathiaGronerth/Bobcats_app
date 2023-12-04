import React, { useRef } from "react";
import backgroundImage from "../../assets/images/background.png";
import Footer from "../components/Footer";
import { IoMdMail } from "react-icons/io";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6uajn9x",
        "template_vvfyi8c",
        form.current,
        "tkNJecbq2kRewCpyc"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert(
            "Your message has been sent successfully. We'll get back to you soon!"
          );
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Oops! Something went wrong. Please try again later.");
        }
      );
  };
  return (
    <div className="contact-form">
      <form className="card-form" ref={form} onSubmit={sendEmail}>
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
        <input
          type="text"
          placeholder="Name"
          className="contact-name"
          name="user_name"
        />
        <input type="email" placeholder="Email" name="user_email" />
        <textarea placeholder="Your Message" name="message"></textarea>
        <button type="submit" onClick={sendEmail}>
          Send Message
        </button>
      </form>
      <Footer style={{position: "fixed", bottom: "0"}} />
    </div>
  );
};

export default ContactForm;
