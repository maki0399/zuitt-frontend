import { useState, useEffect } from "react";
import AppNavBar from "./components/AppNavBar";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./UserContext";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
// import Profile from "./pages/Profile";
import CourseView from "./pages/CourseView";
import NotFound from "./pages/Error";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./components/EditCourse";
import OrdersPage from "./pages/OrderPage";

function App() {
  // let user = { token: localStorage.getItem('token') }
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    // console.log(localStorage);

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  console.log(user);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/course/:productId" element={<CourseView />} />
            <Route path="/product/:productId" element={<CourseView />} />

            <Route path="/orderPage" element={<OrdersPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
