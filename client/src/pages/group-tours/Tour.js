import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../../context/AuthContext";

function Tour() {
  const [Tours, setTours] = useState([]);
  const [sortedTours, setSortedTours] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    const getTours = async () => {
      try {
        const TourList = await axios.get(`http://localhost:8800/api/getTour`);
        if (TourList.data) {
          setTours(TourList.data);
          setSortedTours(TourList.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTours();
  }, []);

  const handleSort = (sortBy) => {
    const sortedData = [...sortedTours];

    if (sortOption === sortBy) {
      sortedData.reverse();
    } else {
      sortedData.sort((a, b) => {
        if (sortBy === "maxPeople") {
          return a.maxPeople - b.maxPeople;
        } else if (sortBy === "price") {
          return a.price - b.price;
        }
        return 0;
      });
    }

    setSortedTours(sortedData);
    setSortOption(sortBy);
  };
  const handleDeleteTour = async (bookingId) => {
    try {
      const response = await axios
        .delete(`http://localhost:8800/api/deleteTour/${bookingId}`)
        .then(() => window.location.reload());
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="mt-4 mx-5">
        <FontAwesomeIcon
          icon={faFilter}
          color="green"
          fontSize="30px"
          style={{ marginRight: "10px" }}
        />
        <Button
          variant="outline-success"
          onClick={() => handleSort("maxPeople")}
          className={`mr-3 ${sortOption === "maxPeople" ? "active" : ""}`}
        >
          Sort by Max People
        </Button>
        <Button
          variant="outline-success"
          onClick={() => handleSort("price")}
          className={`mr-3 ${sortOption === "price" ? "active" : ""}`}
        >
          Sort by Price
        </Button>
        {user.role === "admin" && (
          <Link
            to="/add-tour"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button style={{ marginLeft: "84px" }} variant="success">
              Add Tour
            </Button>
          </Link>
        )}
      </div>

      {sortedTours.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {sortedTours.map((m) => {
            return (
              <div
                key={m._id}
                style={{
                  flexBasis: "calc(30% - 2.4rem)",
                  margin: "2.4rem",
                }}
              >
                <Card
                  style={{
                    width: "100%",
                  }}
                >
                  <Card.Img variant="top" src={m.imageUrl} />
                  <Card.Body>
                    <Card.Title>{m.carModel}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <b>Lisence Number: </b>
                      {m.licenseNum}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Max people: </b>
                      {m.maxPeople}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Price: </b>
                      Rs.{m.price}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    {user.role !== "admin" && (
                      <Link to={`/Tour-booking/${m._id}`}>Book Car</Link>
                    )}
                  </Card.Body>
                  <Card.Body>
                    {user.role === "admin" && (
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteTour(m._id)}
                      >
                        Delete Car
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ width: "5rem", height: "5rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default Tour;
