const path = require("path");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const nodemailer = require("nodemailer");
const React = require("react");
const { renderToString } = require("react-dom/server");
module.exports = app;

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// sends index.html for any remaining requests
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  console.log("Requested path:", req.path);
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kgronerth83@gmail.com",
    pass: process.env.PASSWORD,
  },
});

app.post("/send-confirmation", (req, res) => {
  const { email, orderDetails } = req.body;

  const emailContent = renderToString(
    React.createElement(ConfirmationEmail, {
      orderId: orderDetails.id,
      orderDate: orderDetails.orderDate,
      totalCost: orderDetails.totalCost,
      shoppingMethod: orderDetails.shoppingMethod,
      paymentMethod: orderDetails.paymentMethod,
      state: orderDetails.state,
      items: orderDetails.Items, // Assuming 'Items' is an array of products
    })
  );

  let mailOptions = {
    from: "kgronerth83@gmail.com", // Use the actual email address here
    to: email,
    subject: "Order Confirmation",
    html: emailContent, // Use the rendered HTML content
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});
