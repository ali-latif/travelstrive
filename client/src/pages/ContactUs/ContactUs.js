// import React, { useRef } from "react";
// import emailjs from "@emailjs/browser";

// // import bootstrap;

// function ContactUs() {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(

//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//           console.log("sent");
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };
//   return (
//     <div className="section">
//       <div className="container-fluid ">
//         <div className="container py-5">
//           <div className="text-center mb-3 pb-3">
//             <h1 className="text-success">Contact For Any Query</h1>
//           </div>
//           <div className="row justify-content-center">
//             <div className="col-lg-8">
//               <div
//                 className="contact-form bg-white"
//                 style={{ padding: "30px" }}
//               >
//                 <div id="success"></div>

//                 <form ref={form} onSubmit={sendEmail}>
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="control-group">
//                         <input
//                           type="text"
//                           className="form-control p-4"
//                           placeholder="Your Name"
//                           required="required"
//                           data-validation-required-message="Please enter your name"
//                           name="user_name"
//                         />
//                         <p className="help-block text-danger"></p>
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="control-group">
//                         <input
//                           type="email"
//                           className="form-control p-4"
//                           name="user_email"
//                           placeholder="Your Email"
//                           required="required"
//                           data-validation-required-message="Please enter your email"
//                         />
//                         <p className="help-block text-danger"></p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="control-group">
//                     <input
//                       type="text"
//                       className="form-control p-4"
//                       name="subject"
//                       placeholder="Subject"
//                       required="required"
//                       data-validation-required-message="Please enter a subject"
//                     />
//                     <p className="help-block text-danger"></p>
//                   </div>
//                   <div className="control-group">
//                     <textarea
//                       className="form-control py-3 px-4"
//                       rows="5"
//                       name="message"
//                       placeholder="Message"
//                       required="required"
//                       data-validation-required-message="Please enter your message"
//                     />
//                     <p className="help-block text-danger"></p>
//                   </div>
//                   <div className="text-center">
//                     <button
//                       className="btn btn-success py-3 px-4"
//                       type="submit"
//                       value="Send"
//                     >
//                       Send Message
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactUs;
