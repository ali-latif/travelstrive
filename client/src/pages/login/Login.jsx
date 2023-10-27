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
      if (res.data.details.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    console.log("login");
  };

  return (
    <div
      className="col-lg-5 border border-success rounded"
      style={{ margin: "5rem 25rem" }}
    >
      <div className="card border-0 ">
        <div className="card-header bg-success text-center p-4">
          <h1 className="text-white m-0">Log In Now</h1>
        </div>
        <div className="card-body rounded-bottom bg-white p-5">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control p-3 lInput mb-2"
                placeholder="Your name"
                required="required"
                id="username"
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                required="required"
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput form-control p-3 mb-3"
                autoComplete="off"
              />
            </div>

            <div>
              <Button
                className="btn btn-success btn-block py-2 px-4 mb-2 fw-bolder"
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
