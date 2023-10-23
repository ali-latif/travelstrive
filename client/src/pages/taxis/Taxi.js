import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

function Taxi() {
  const [taxis, setTaxis] = useState([]);
  useEffect(() => {
    const getTaxis = async () => {
      try {
        const taxiList = await axios.get(`http://localhost:8800/api/gettaxi`);
        if (taxiList.data) {
          setTaxis(taxiList.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTaxis();
  }, []);

  return (
    <div>
      <Navbar style />
      <Header type="list" />
      {taxis ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {taxis.map((m) => {
            return (
              <div
                key={m._id}
                style={{
                  flexBasis: "calc(30% - 2.4rem)", // 33.33% width for each card with margin
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
                    <Link to={`/taxi-booking/${m._id}`}>Book Car</Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Cars Available</div>
      )}
      <Footer />
    </div>
  );
}

export default Taxi;
