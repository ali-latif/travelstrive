import React, { useState, useEffect, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { DateRange } from "react-date-range";
import { AuthContext } from "../../context/AuthContext";
import "react-date-range/dist/styles.css"; // Import the styles
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const ReserveTaxi = ({ taxiData }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [totalPriceTaxi, setTotalPriceTaxi] = useState(0);
  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();

  const taxiprice = taxiData?.price;

  const { user } = useContext(AuthContext);
  const [iid, setIID] = useState("");

  // setDetail(user);
  // if (user) {
  //   console.log(user);
  // }

  useEffect(() => {
    const totalDays =
      (dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24) +
      1;
    const totalPrice = taxiprice * totalDays;

    setTotalPriceTaxi(totalPrice);
  }, [dateRange]);
  // sDate = dateRange[0].startDate.toDateString();
  // eDate = dateRange[0].endDate.toDateString();

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    if (dateRange) {
      setEDate(dateRange[0].endDate.toDateString());
      setSDate(dateRange[0].startDate.toDateString());
    }
    // console.log("user", user);
    setIID(user._id);
  };
  const handleBooking = () => {
    console.log("Booking successful");
  };

  return (
    <Formik
      initialValues={{
        name: "",
        city: "",

        totalPrice: 0,
      }}
      onSubmit={(values, { setSubmitting }) => {
        // console.log("values ", values);
        // console.log(iid);
        const data = {
          userId: iid,
          taxiId: taxiData?._id,
          name: values.name,
          city: values.city,
          startDate: sDate,
          endDate: eDate,
          totalPrice: totalPriceTaxi,
          taxiName: taxiData.carModel,
        };
        console.log("data ", data);

        axios
          .post("http://localhost:8800/api/addtaxi-booking", data)
          .then((response) => {
            console.log("Booking successful", response.data);
            handleBooking();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <div style={{ margin: "30px", paddingRight: "100px" }}>
          <form className="card p-3 bg-light" onSubmit={handleSubmit}>
            <div className="form-group row my-2 ">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="city" className="col-sm-2 col-form-label">
                City
              </label>
              <div className="col-sm-10">
                <input
                  type="city"
                  className="form-control"
                  id="city"
                  placeholder="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="people" className="col-sm-2 col-form-label">
                People
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="people"
                  placeholder="0"
                  max={taxiData?.maxPeople}
                  min={1}
                />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="people" className="col-sm-2 col-form-label">
                Price
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder={`Rs. ${taxiprice} per day`}
                  readOnly={true}
                ></input>
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="people" className="col-sm-2 col-form-label">
                Dates
              </label>
              <div className="col-sm-10">
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="btn btn-outline-dark"
                >
                  Choose Dates
                </button>
                {showCalendar && (
                  <DateRange
                    ranges={dateRange}
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                  />
                )}
                {dateRange[0].startDate !== dateRange[0].endDate && (
                  <div style={{ fontSize: "12px", marginTop: "8px" }}>
                    <h6>Selected Dates:</h6>
                    <p>
                      <b>Start Date:</b> {dateRange[0].startDate.toDateString()}
                    </p>
                    <p>
                      <b>End Date:</b> {dateRange[0].endDate.toDateString()}
                    </p>
                  </div>
                )}
              </div>
              <div className="form-group row my-2">
                <label htmlFor="people" className="col-sm-2 col-form-label">
                  Total
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    type="number"
                    id="totalPrice"
                    placeholder={`Rs. ${totalPriceTaxi}`}
                    readOnly={true}
                  ></input>
                </div>
              </div>
            </div>
            {/* <div className="form-group row my-2">
          <div className="col-sm-4">Driver reuired</div>
          <div className="col-sm-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Yes
              </label>
            </div>
          </div>
        </div> */}
            <div className="form-group row my-2">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">
                  Book
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default ReserveTaxi;
