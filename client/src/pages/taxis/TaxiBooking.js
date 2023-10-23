import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function TaxiBooking() {
  const [taxiData, setTaxiData] = useState(null);
  const location = useLocation();
  const parts = location.pathname.split("/"); // Split the pathname by '/'
  const carId = parts[parts.length - 1];

  useEffect(() => {
    const fetchTaxiData = async () => {
      try {
        const response = await axios
          .get(`http://localhost:8800/api/taxi-booking/${carId}`)
          .then((res) => setTaxiData(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTaxiData();
  }, [carId]);

  return (
    <div>
      <Navbar style />
      <Header type="list" />
      <Container style={{ fontSize: "16px" }}>
        <Row>
          <Col></Col>
          <Col>
            <h1>Taxi Details</h1>
            {taxiData ? (
              <Card
                style={{
                  width: "100%",
                }}
              >
                <Card.Img
                  variant="top"
                  src={taxiData.imageUrl}
                  alt={taxiData.carModel}
                  height="400vh"
                  width="auto"
                />
                <Card.Body>
                  <Card.Title>{taxiData.carModel}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <b>Lisence Number: </b>
                    {taxiData.licenseNum}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Max people: </b>
                    {taxiData.maxPeople}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Price: </b>
                    Rs.{taxiData.price}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ) : (
              <p>Loading taxi details...</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TaxiBooking;
