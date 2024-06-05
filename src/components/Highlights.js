import { Row, Col, Card } from "react-bootstrap";
import "../App.css";

export default function Highlights() {
  return (
    <Row className="mt-3 mb-3">
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3 shadow-on-hover tech-card">
          <Card.Body className="text-center">
            <Card.Title>
              <h2>Explore Tech Marvels</h2>
            </Card.Title>
            <Card.Text>
              Discover the latest in cutting-edge technology. From smart gadgets
              to futuristic innovations, elevate your lifestyle with our
              handpicked collection.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3 shadow-on-hover tech-card">
          <Card.Body className="text-center">
            <Card.Title>
              <h2>Future-Ready Gadgets</h2>
            </Card.Title>
            <Card.Text>
              Stay ahead with our range of gadgets designed for the future.
              Unleash the power of innovation and transform the way you live,
              work, and play.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3 shadow-on-hover tech-card">
          <Card.Body className="text-center">
            <Card.Title>
              <h2>Join the Tech Tribe</h2>
            </Card.Title>
            <Card.Text>
              Become part of a tech-savvy community. Share experiences,
              insights, and passion for gadgets. Your journey into the future of
              technology starts here.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
