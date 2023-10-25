import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Orders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersList = await axios.get(
          `http://localhost:8800/api/gettaxi-booking`
        );
        if (ordersList.data) {
          setOrders(ordersList.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      {orders ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {orders.map((m) => {
            // Filter orders to include only the ones that match the user's _id
            if (user && m.userId === user._id) {
              return (
                <div
                  key={m._id}
                  style={{
                    flexBasis: "calc(30% - 2.4rem)",
                    margin: "2.4rem",
                  }}
                >
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>{m.name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <b>Car Model: </b>
                        {m.taxiName}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Booked From </b>
                        {new Date(m.bookedFrom).toISOString().split("T")[0]}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Booked Till </b>
                        {new Date(m.bookedTill).toISOString().split("T")[0]}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Booked At </b>
                        {new Date(m.createdAt).toISOString().split("T")[0]}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Price: </b>
                        Rs.{m.totalPrice}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              );
            } else {
              return null; // Skip rendering for orders that don't match the user
            }
          })}
        </div>
      ) : (
        <div>No Bookings Available</div>
      )}
    </div>
  );
}

export default Orders;
