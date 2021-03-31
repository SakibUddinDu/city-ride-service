import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {

  const [loggedInUser,setLoggedInUser]= useContext(UserContext)
  return (
    <div>
      <Container>
        <Navbar expand="lg" >
          <Navbar.Brand href="#">
            <h1>City Rider Service</h1>
          </Navbar.Brand>
     
          <Nav className="mr-5 navItems">
            <Link to="/home">Home</Link>
            <Link  to="/destination">Destination</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">
                <Button  variant="outline-dark">LogIn</Button>
            </Link>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;
