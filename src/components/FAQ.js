import React from "react";
import { FcFaq } from "react-icons/fc";
const FAQ = () => {
  const questions = [
    {
      question: "How does Bobcat Carpool work?",
      answer:
        "Users can register and post or search for available rides within the Texas State University community.",
    },
    {
      question: "Is this service free?",
      answer:
        "Yes, Bobcat Carpool is a community-driven platform and is free to use.",
    },
    // ... add more questions and answers
  ];

  return (
    <div className="faq-container">
      <div className="faq">
        <h2>
          Frequently Asked Questions{" "}
          <FcFaq
            style={{
              width: "30px",
              height: "auto",
            }}
          />
        </h2>
        {questions.map((item, index) => (
          <div key={index} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
