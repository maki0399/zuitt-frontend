import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css"; // Import the CSS file for styling

export default function Product(props) {
  const { breakPoint, data } = props;
  const { _id, name, description, price } = data;

  return (
    <Col xs={12} md={breakPoint}>
      <Card className="cardHighlight mx-2 product-card">
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/course/${_id}`}>
              {name} <FontAwesomeIcon icon={faCartPlus} />
            </Link>
          </Card.Title>
          <Card.Text className="text-center">{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <h5 className="text-center">₱{price}</h5>
          <Link className="btn btn-primary d-block" to={`/course/${_id}`}>
            Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}
