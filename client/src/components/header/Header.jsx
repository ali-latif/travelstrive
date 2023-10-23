import React from "react";

import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faContactBook,
  faContactCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import "../navbar/navbar.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const navigate = useNavigate();
  const logthisout = () => {
    localStorage.clear();
    window.location.reload();
    //alert("Great Shot!");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div
            className={`headerListItem ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <FontAwesomeIcon icon={faBed} />
              <span> Stays</span>
            </Link>
          </div>
          <div
            className={`headerListItem ${
              location.pathname === "/taxi" ? "active" : ""
            }`}
          >
            <Link to="/taxi" style={{ color: "white", textDecoration: "none" }}>
              <FontAwesomeIcon icon={faTaxi} />
              <span> Taxis</span>
            </Link>
          </div>
          <div
            className={`headerListItem ${
              location.pathname === "/contact-us" ? "active" : ""
            }`}
          >
            <Link
              to="/contact-us"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faContactBook} />
              <span> ContactUs</span>
            </Link>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">Wanna Book Room?</p>
            {/* {!user && <button className="headerBtn">Sign in / Register</button>} */}
            <div className="headerSearch" style={{ padding: "1.4rem" }}>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <div className="navbar" style={{ marginLeft: "-10rem" }}>
          <span>{user.username}&nbsp;&nbsp;</span>

          <div className="profile-icon " onClick={toggleDropdown}>
            <i
              className="fa fa-user"
              aria-hidden="true"
              style={{ marginLeft: "-7rem" }}
            ></i>
          </div>
          {isDropdownOpen && (
            <div className="options ">
              <div style={{ listStyleType: "none" }}>
                <Link
                  to="/:id"
                  style={{ color: "grey", textDecoration: "none" }}
                >
                  <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Profile </span>
                </Link>
                <button
                  className="navButton dropdown-item"
                  style={{ color: "grey" }}
                >
                  Orders &nbsp;&nbsp;&nbsp;
                </button>
                <Link
                  to="/login"
                  style={{ color: "grey", textDecoration: "none" }}
                >
                  <button
                    className="navButton dropdown-item"
                    // onClick={logthisout}
                    style={{ color: "red" }}
                  >
                    Logout &nbsp;&nbsp;&nbsp;
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
