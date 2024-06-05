import React, { useState, useEffect, useContext } from "react";
import { Container, ListGroup, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

export default function OrdersPage() {
  const { user } = useContext(UserContext);

  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const authToken = localStorage.getItem("token");

        if (!authToken) {
          console.error("Authentication token not found");
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Error retrieving user orders:", response.statusText);
          return;
        }

        const data = await response.json();
        console.log("User Orders:", data.userOrder); // Debugging log

        setUserOrders(data.userOrder); // Access userOrder from the API response
      } catch (error) {
        console.error("Error fetching user orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  return user.isAdmin === false ? (
    <Container>
      <h1 className="my-5 text-center">My Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <Card>
          <Card.Body>
            {userOrders.map((order) => (
              <Card key={order._id} className="mb-3">
                <Card.Body>
                  <Card.Title>Order ID: {order.orderId}</Card.Title>
                  <Card.Subtitle>User ID: {order.userId}</Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      )}
    </Container>
  ) : (
    <Navigate to="/courses" />
  );
}
