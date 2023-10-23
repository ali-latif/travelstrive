import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./login.css";
import React from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    console.log("login");
  };

  return (
    // <div className="hrms_title" style={{ width: "500px" }}>
    //   <div className="lContainer">
    //     <input
    //       type="text"
    //       placeholder="username"
    //       id="username"
    //       onChange={handleChange}
    //       className="lInput"
    //     />
    //     <input
    //       type="password"
    //       placeholder="password"
    //       id="password"
    //       onChange={handleChange}
    //       className="lInput"
    //     />

    //     {error && <span>{error.message}</span>}
    //     <div className="btnDiv">
    //       <Button
    //         style={{
    //           backgroundColor: "darkturquoise",
    //           borderColor: "white",
    //           width: "300px",
    //         }}
    //         type="submit"
    //         onClick={handleClick}
    //       >
    //         Login
    //       </Button>
    //     </div>
    //     <span>
    //       Don't have an account{" "}
    //       <Link to="/SignUp" className="lButton ">
    //         Sign Up
    //       </Link>
    //     </span>
    //   </div>
    // </div>
    <div className="col-lg-5" style={{ margin: "5rem 25rem" }}>
      <div className="card border-0">
        <div className="card-header bg-primary text-center p-4">
          <h1 className="text-white m-0">Log In Now</h1>
        </div>
        <div className="card-body rounded-bottom bg-white p-5">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control p-4 lInput"
                placeholder="Your name"
                required="required"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                required="required"
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput form-control p-4"
              />
            </div>
            <div>
              <Button
                className="btn btn-primary btn-block py-3"
                type="submit"
                onClick={handleClick}
              >
                Login
              </Button>
            </div>

            <span>
              Don't have an account{" "}
              <Link to="/SignUp" className="lButton ">
                Sign Up
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

// import React, { useContext, useEffect, useState } from "react";
// import { Formik } from "formik";
// // import { loginSchema } from "./LoginSchema";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // import { UserContext } from "../Context/userContext";
// // import { StatusContext } from "../Context/statusContext";
// import Button from "react-bootstrap/Button";
// // import { decodeToken } from "react-jwt";
// import "./login.css";
// import Form from "react-bootstrap/Form";
// // import { PersistFormikValues } from "formik-persist-values";
// // import { PaymentContext } from '../Context/paymentContext';
// // import toast, { Toaster } from "react-hot-toast";

// const initialValues = {
//   email: "",
//   password: "",
// };

// function LoginForm() {
//   var rem = Boolean(localStorage.getItem("remember-me"));
//   // const { currentUser, setCurrentUser } = useContext(UserContext);
//   // const { adminStatus, setAdminStatus } = useContext(StatusContext);
//   const [isChecked, setIsChecked] = useState(
//     rem !== null && rem !== undefined ? rem : false
//   );
//   // const notify = () => toast("Here is your toast.");

//   // useEffect(() => {
//   // console.log(currentUser);
//   // }, [currentUser]);

//   const navigate = useNavigate();
//   // const refresh = () => {
//   // window.location.reload(true);
//   // };
//   return (
//     <div>
//       <div className="hrms_title">
//         <h2 style={{ color: "darkturquoise" }}>HR &nbsp;</h2>

//         <h2>Portal</h2>
//       </div>
//       <Formik
//         initialValues={initialValues}
//         // validationSchema={loginSchema}
//         onSubmit={async (values) => {
//           if (!isChecked) {
//             localStorage.removeItem("login-form");
//             localStorage.removeItem("remember-me");
//           } else if (isChecked) {
//             localStorage.setItem("remember-me", true);
//           }
//           const res = await axios
//             .post("http://localhost:8800/api/auth/login", {
//               email: values.email,
//               password: values.password,
//             })
//             .catch((err) => {
//               console.error("err");
//             });
//           // if (res.status == 200) {
//           // notify();
//           // <Toaster />;
//           // await setCurrentUser(res.data.user);
//           // localStorage.setItem("token", res.data.token);
//           // const isAdmin = decodeToken(res.data.token).isAdmin;
//           // setAdminStatus(isAdmin);
//           // } else {
//           // navigate("/login");
//           // }
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <div className="email-block">
//               <label htmlFor="email">Email</label>
//               <br />
//               <input
//                 type="email"
//                 autoComplete="off"
//                 name="email"
//                 id="email"
//                 placeholder="Email"
//                 value={values.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.email && touched.email ? (
//                 <p className="form-error">{errors.email}</p>
//               ) : null}
//             </div>
//             <div className="password-block">
//               <label htmlFor="password">Password</label>
//               <br />
//               <input
//                 type="password"
//                 autoComplete="off"
//                 name="password"
//                 id="password"
//                 placeholder="Password"
//                 value={values.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.password && touched.password ? (
//                 <p className="form-error">{errors.password}</p>
//               ) : null}
//             </div>
//             <div className="rememberme">
//               <Form.Check
//                 type="checkbox"
//                 id="default-checkbox"
//                 label="Remember me"
//                 checked={isChecked}
//                 onChange={() => setIsChecked(!isChecked)}
//               />
//             </div>
//             <br />
//             <div className="btnDiv">
//               <Button
//                 style={{
//                   backgroundColor: "darkturquoise",
//                   borderColor: "white",
//                   width: "300px",
//                 }}
//                 type="submit"
//               >
//                 Login
//               </Button>
//             </div>
//             {/* <PersistFormikValues name="login-form" /> */}
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default LoginForm;
