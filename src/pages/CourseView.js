import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function CourseView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const orders = (userId, productId) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      console.error("No token found. User may not be logged in.");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to add to cart: ${res.statusText}`);
        }

        const contentType = res.headers.get("content-type");

        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((responseData) => {
        console.log("Response Data:", responseData);

        if (
          typeof responseData === "string" &&
          responseData.includes("Ordered Successfully")
        ) {
          Swal.fire({
            title: "Add to cart",
            icon: "success",
            text: "You have successfully added an item to the cart.",
          });

          navigate("/courses");
        } else {
          console.log("Unexpected response:", responseData);
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);

        Swal.fire({
          title: "Error",
          icon: "error",
          text: error.message || "An error occurred. Please try again later.",
        });
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {price}</Card.Text>
              {user.id !== null ? (
                <Button
                  variant="primary"
                  block
                  onClick={() => orders(user.id, productId)}
                >
                  Buy now
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Log in to Purchase
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
