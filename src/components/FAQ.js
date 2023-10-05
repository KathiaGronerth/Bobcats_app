import React from "react";

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
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      {questions.map((item, index) => (
        <div key={index} className="faq-item">
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
