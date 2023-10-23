const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use the appropriate email service name
  auth: {
    user: process.env.EMAIL, // Your Gmail email address
    pass: process.env.PASSWORD, // Your Gmail password or an App Password if you have two-factor authentication enabled
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;

  var mail = {
    from: email, // You can set the sender's email address here
    to: "alillatif003@gmail.com", // Replace with the recipient's email address
    subject: subject,
    text: message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

app.listen(8800, () => {
  console.log("Server is running on port 3000");
});
