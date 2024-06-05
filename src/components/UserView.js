import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

export default function UserView({ coursesData }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const coursesArr = coursesData.map((course) => {
      //only render the active products since the route used is /all from Course.js page
      if (course.isActive === true) {
        return <CourseCard courseProp={course} key={course._id} />;
      } else {
        return null;
      }
    });

    setCourses(coursesArr);
  }, [coursesData]);

  return <>{courses}</>;
}
