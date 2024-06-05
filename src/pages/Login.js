import { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import CourseView from "./CourseView";

export default function Login() {
  // Allows us to consume the User context and its properties to use for validation
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isActive, setIsActive] = useState(false);
  const [showError, setShowError] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.access) {
          // Store the token in local storage
          localStorage.setItem("token", data.access);

          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome to GadgetGrove",
          });

          retrieveUserDetails(data.access);
        } else {
          setShowError(true);
        }
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/userDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  useEffect(() => {
    setIsActive(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <Form onSubmit={(e) => authenticate(e)}>
            <h1 className="my-5 text-center">Login</h1>

            {showError && (
              <Alert
                variant="danger"
                onClose={() => setShowError(false)}
                dismissible
              >
                <p>
                  Authentication failed. Check your login details and try again.
                </p>
              </Alert>
            )}

            <Form.Group controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {isActive ? (
              <Button variant="primary" type="submit" id="submitBtn" block>
                Submit
              </Button>
            ) : (
              <Button
                variant="danger"
                type="submit"
                id="submitBtn"
                block
                disabled
              >
                Submit
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
