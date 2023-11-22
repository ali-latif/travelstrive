import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import ReserveTour from "./ReserveTour";

function TourBooking() {
  const [TourData, setTourData] = useState(null);
  const location = useLocation();
  const parts = location.pathname.split("/"); // Split the pathname by '/'
  const carId = parts[parts.length - 1];

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios
          .get(`http://localhost:8800/api/Tour-booking/${carId}`)
          .then((res) => setTourData(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTourData();
  }, [carId]);

  return (
    <div>
      <Container style={{ fontSize: "16px" }}>
        <Row>
          <Col className="col-sm-8">
            <h2 className="px-4">Booking Details</h2>
            <ReserveTour TourData={TourData} />
          </Col>
          <Col>
            <h2>Tour Details</h2>
            {TourData ? (
              <Card
                style={{
                  width: "100%",
                }}
                className="card p-3 bg-light"
              >
                <Card.Img
                  variant="top"
                  src={TourData.imageUrl}
                  alt={TourData.carModel}
                />
                <Card.Body>
                  <Card.Title>{TourData.carModel}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <b>Lisence Number: </b>
                    {TourData.licenseNum}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Max people: </b>
                    {TourData.maxPeople}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Price: </b>
                    Rs.{TourData.price}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ) : (
              <p>Loading Tour details...</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TourBooking;
