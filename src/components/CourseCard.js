import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function CourseCard({ courseProp }) {
  const { _id, name, description, price } = courseProp;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>Php {price}</Card.Text>
        <Link className="btn btn-primary" to={`/course/${_id}`}>
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}

CourseCard.propTypes = {
  courseProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
