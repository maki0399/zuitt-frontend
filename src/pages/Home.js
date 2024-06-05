import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import FeaturedCourses from "../components/FeaturedCourses";
import "../App.css"; // Import the CSS file

export default function Home() {
  const data = {
    title: "GadgetGrove: Your Tech Wonderland",
    content:
      "Empowering Your Shopping Journey, Where Convenience Meets Quality!",
    destination: "/courses",
    label: (
      <>
        Shop now <FontAwesomeIcon icon={faShoppingCart} />
      </>
    ),
  };

  return (
    <div className="home-content">
      <Banner data={data} />
      <FeaturedCourses />
      <Highlights />
    </div>
  );
}
