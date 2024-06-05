import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ArchiveCourse({ productId, isActive, fetchData }) {
  const handleArchiveToggle = () => {
    fetch(`${process.env.REACT_APP_API_URL}/product/${productId}/archive`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product successfully disabled",
          });
          fetchData(); // Update data after successful archive
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again",
          });
          fetchData(); // Update data even if there's an error
        }
      });
  };

  const handleActivateToggle = () => {
    fetch(`${process.env.REACT_APP_API_URL}/product/${productId}/activate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product successfully activated",
          });
          fetchData(); // Update data after successful activation
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again",
          });
          fetchData(); // Update data even if there's an error
        }
      });
  };

  return (
    <>
      {isActive ? (
        <Button variant="danger" size="sm" onClick={handleArchiveToggle}>
          Disable
        </Button>
      ) : (
        <Button variant="success" size="sm" onClick={handleActivateToggle}>
          Activate
        </Button>
      )}
    </>
  );
}
