import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import EditCourse from "./EditCourse";
import ArchiveCourse from "./ArchiveCourse";

const AdminView = ({ coursesData, fetchData }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Courses data received:", coursesData); // Add this log
    const productsArr = coursesData.map((course) => (
      <tr key={course._id}>
        <td>{course._id}</td>
        <td>{course.name}</td>
        <td>{course.description}</td>
        <td>{course.price}</td>
        <td className={course.isActive ? "text-success" : "text-danger"}>
          {course.isActive ? "Available" : "Unavailable"}
        </td>
        <td>
          <EditCourse product={course._id} fetchData={fetchData} />
        </td>
        <td>
          <ArchiveCourse
            productId={course._id}
            isActive={course.isActive}
            fetchData={fetchData}
          />
        </td>
      </tr>
    ));

    console.log("Products to be set:", productsArr); // Add this log
    setProducts(productsArr);
  }, [coursesData, fetchData]);

  console.log("Rendered with products:", products); // Add this log

  return (
    <>
      <h1 className="text-center my-4">Admin Dashboard</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody>{products}</tbody>
      </Table>
    </>
  );
};

export default AdminView;
