import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import React, { useState } from "react";
import axios from "axios";

// import bootstrap;

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  }

  // Step 2: Adding Handler Functions
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onSubjectChange(event) {
    this.setState({ subject: event.target.value });
  }

  onMsgChange(event) {
    this.setState({ message: event.target.value });
  }
  submitEmail(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/send",
      data: this.state,
    }).then((response) => {
      if (response.data.status === "success") {
        alert("Message Sent.");
        this.resetForm();
      } else if (response.data.status === "fail") {
        alert("Message failed to send.");
      }
    });
  }

  resetForm() {
    this.setState({ name: "", email: "", subject: "", message: "" });
  }

  render() {
    return (
      <div className="section">
        <Navbar style />
        <Header type="list" />
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="text-center mb-3 pb-3">
              <h6
                className="text-primary text-uppercase"
                style={{ letterSpacing: "5px" }}
              >
                Contact
              </h6>
              <h1>Contact For Any Query</h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div
                  className="contact-form bg-white"
                  style={{ padding: "30px" }}
                >
                  <div id="success"></div>
                  <form
                    name="sentMessage"
                    id="contactForm"
                    noValidate="novalidate"
                  >
                    <div className="form-row">
                      <div className="control-group col-sm-6">
                        <input
                          type="text"
                          className="form-control p-4"
                          id="name"
                          placeholder="Your Name"
                          required="required"
                          data-validation-required-message="Please enter your name"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="control-group col-sm-6">
                        <input
                          type="email"
                          className="form-control p-4"
                          id="email"
                          placeholder="Your Email"
                          required="required"
                          data-validation-required-message="Please enter your email"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>

                    <div className="control-group">
                      <input
                        type="text"
                        className="form-control p-4"
                        id="subject"
                        placeholder="Subject"
                        required="required"
                        data-validation-required-message="Please enter a subject"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="control-group">
                      <textarea
                        className="form-control py-3 px-4"
                        rows="5"
                        id="message"
                        placeholder="Message"
                        required="required"
                        data-validation-required-message="Please enter your message"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary py-3 px-4"
                        type="submit"
                        id="sendMessageButton"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default ContactUs;
