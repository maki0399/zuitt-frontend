import { useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import PreviewCourses from "./PreviewCourses";

export default function FeaturedCourses() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/products/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const numbers = [];
        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data.length);

          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };

        for (let i = 0; i < 4; i++) {
          generateRandomNums();

          featured.push(
            <PreviewCourses
              data={data[numbers[i]]}
              key={data[numbers[i]]._id}
              breakPoint={3}
            />
          );
        }

        setPreviews(featured);
      });
  }, []);

  return (
    <>
      <h2 className="text-center mb-5">Hot Products</h2>
      <CardGroup className="justify-content-center mb-5">{previews}</CardGroup>
    </>
  );
}
