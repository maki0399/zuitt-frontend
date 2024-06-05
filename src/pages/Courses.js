import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CourseCard from "../components/CourseCard";
import UserContext from "../UserContext";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";

export default function Courses() {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/product/all`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="courses-background">
      <h2 className="text-center mt-4">Available Products</h2>
      <Container className="mt-4">
        {user.isAdmin === false && <Row className="mb-3"></Row>}
        <Row>
          <Col>
            {user.isAdmin === true ? (
              <AdminView coursesData={courses} fetchData={fetchData} />
            ) : (
              <UserView coursesData={courses} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
