import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useRef } from "react";
import {
  faBed,
  faCalendarDays,
  faPerson,
  faTaxi,
  faContactBook,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { SearchContext } from "../../context/SearchContext";
import Dropdown from "react-bootstrap/Dropdown";
// const navigate = useNavigate();

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [userState, setUserState] = useState();

  var { user } = useContext(AuthContext);
  useEffect(() => {
    setUserState(user);
  }, [user]);
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(SearchContext);

  const logthisout = () => {
    localStorage.clear();
    setUserState("");
    // console.log(user);
    // window.location.reload();
    //alert("Great Shot!");
    navigate("/login");
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="bg-success px-5">
      <nav className="navbar navbar-expand-lg navbar-success bg-success">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">
          Home
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div
            className={
              type === "list" ? "headerContainer listMode" : "headerContainer"
            }
          >
            <div className="headerList ">
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
                <Link
                  to="/taxi"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faTaxi} />
                  <span> Taxis</span>
                </Link>
              </div>
              <div
                className={`headerListItem ${
                  location.pathname === "/tour" ? "active" : ""
                }`}
              >
                <Link
                  to="/tour"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faCar} />
                  <span> Tours</span>
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
          </div>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <div className="input-group">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button
                className="btn btn-dark border-green my-sm-0"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </nav>
      {location.pathname === "/" && (
        <>
          <p className="headerDesc ">Wanna Book Room?</p>
          {/* {!user && <button className="headerBtn">Sign in / Register</button>} */}
          <div className="headerSearch py-4" style={{ marginRight: "12px" }}>
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
  );
};

export default Header;
