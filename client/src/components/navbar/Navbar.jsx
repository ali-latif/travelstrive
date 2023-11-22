import React, { useEffect, useState } from "react";
// import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import Dropdown from "react-bootstrap/Dropdown";
//import Logo from "../../../public/logo.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userState, setUserState] = useState();
  useEffect(() => {
    setUserState(user);
  }, [user]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const navigate = useNavigate();
  const logthisout = () => {
    localStorage.clear();
    setUserState("");
    // console.log(user);
    // window.location.reload();
    //alert("Great Shot!");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    // <div
    //   className="container-fluid d-lg-block"
    //   style={{ backgroundColor: "#023e10", color: "white" }}
    // >
    //   <div className="container">
    //     <div className="row" style={{ alignItems: "center" }}>
    //       <div
    //         className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0"
    //         style={{ alignContent: "center" }}
    //       >
    //         <Link to="/" style={{ color: "grey", textDecoration: "none" }}>
    //           <img
    //             src="./img/logo.png"
    //             alt="logo"
    //             height={50}
    //             style={{ marginRight: "3.6rem" }}
    //           />
    //         </Link>
    //         <div className="d-inline-flex align-items-center">
    //           <p>
    //             <i className="fa fa-envelope mr-2"></i>fast@lhr.com
    //           </p>
    //           <p className="text-body px-3">|</p>
    //           <p>
    //             <i className="fa fa-phone-alt mr-2"></i>+92 345 67890
    //           </p>
    //         </div>
    //       </div>
    //       <div className="col-lg-6 text-center text-lg-right">
    //         <div className="navContainer">
    //           {user ? (
    //             <div>
    //               <div className="navbar">
    //                 <Dropdown>
    //                   <Dropdown.Toggle variant="success" id="dropdown-basic">
    //                     <span>{userState?.username}&nbsp;&nbsp;</span>
    //                     <i
    //                       className="fa fa-user border border-white rounded-circle p-1"
    //                       aria-hidden="true"
    //                     ></i>
    //                   </Dropdown.Toggle>

    //                   <Dropdown.Menu>
    //                     <Dropdown.Item href="/:id">Profile</Dropdown.Item>
    //                     <Dropdown.Item href="/orders">Orders</Dropdown.Item>
    //                     <Dropdown.Item
    //                       onClick={logthisout}
    //                       style={{ color: "red" }}
    //                     >
    //                       Logout
    //                     </Dropdown.Item>
    //                   </Dropdown.Menu>
    //                 </Dropdown>
    //               </div>
    //             </div>
    //           ) : (
    //             <div className="navItems">
    //               {/* <button className="navButton">Register</button> */}
    //               <Link to="/Login">
    //                 <button className="navButton">Login</button>
    //               </Link>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className=" bg-green px-5"
      style={{
        backgroundColor: "#023e10",
        color: "white",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-green bg-green ">
        <a className="navbar-brand" href="/">
          <img src="./img/logo.png" alt="logo" height={50} />
        </a>

        <div
          className="collapse navbar-collapse mx-5 px-5 "
          id="navbarSupportedContent"
        >
          <p>
            <i className="fa fa-envelope mr-2"></i>fast@lhr.com
          </p>
          <p className="text-body px-3">|</p>
          <p>
            <i className="fa fa-phone-alt mr-2"></i>+92 345 67890
          </p>
        </div>
        <div className="col-lg-2 text-center text-lg-right">
          <div className="navContainer">
            {user ? (
              <div>
                <div className="navbar">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <span>{userState?.username}&nbsp;&nbsp;</span>
                      <i
                        className="fa fa-user border border-white rounded-circle p-1"
                        aria-hidden="true"
                      ></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/:id">Profile</Dropdown.Item>
                      <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                      <Dropdown.Item
                        onClick={logthisout}
                        style={{ color: "red" }}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <div className="navItems">
                {/* <button className="navButton">Register</button> */}
                <Link to="/Login">
                  <button className="navButton">Login</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
