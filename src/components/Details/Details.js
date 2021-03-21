import React, { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { RideContext } from "../../App";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import icon from "../../images/peopleicon.png";
import Header from "../Header/Header";
import "./Details.css";

const Details = () => {
  const [ride, setRide] = useContext(RideContext);


  return (
    <div className="container row">
      <div className="col-md-4">
        <Header></Header>
        <Card style={{ width: "18rem" }}>
          <div style={{ backgroundColor: "blue" }}>
            <div className="status">
              <ul>
                <li> From : {ride.from}</li>
                <li>To : {ride.To}</li>
              </ul>
            </div>
          </div>
          <ListGroup.Item>
            {" "}
            <img
              style={{ height: "30px", width: "30px" }}
              src={ride.pic}
              alt=""
            />{" "}
            <span>{ride.name}</span>
            <span>
              <img
                style={{ height: "30px", width: "30px" }}
                src={icon}
                alt=""
              />
            </span>
            <span>{ride.person}</span>
            <span style={{ marginLeft: "30px" }}>${ride.price}</span>
          </ListGroup.Item>
          <br />
          <ListGroup.Item>
            {" "}
            <img
              style={{ height: "30px", width: "30px" }}
              src={ride.pic}
              alt=""
            />{" "}
            <span>{ride.name}</span>
            <span>
              <img
                style={{ height: "30px", width: "30px" }}
                src={icon}
                alt=""
              />
            </span>
            <span>{ride.person}</span>
            <span style={{ marginLeft: "30px" }}>${ride.price}</span>
          </ListGroup.Item>
          <br />
          <ListGroup.Item>
            {" "}
            <img
              style={{ height: "30px", width: "30px" }}
              src={ride.pic}
              alt=""
            />{" "}
            <span>{ride.name}</span>
            <span>
              <img
                style={{ height: "30px", width: "30px" }}
                src={icon}
                alt=""
              />
            </span>
            <span>{ride.person}</span>
            <span style={{ marginLeft: "30px" }}>${ride.price}</span>
          </ListGroup.Item>
          <br />
          <ListGroup.Item>
            {" "}
            <img
              style={{ height: "30px", width: "30px" }}
              src={ride.pic}
              alt=""
            />{" "}
            <span>{ride.name}</span>
            <span>
              <img
                style={{ height: "30px", width: "30px" }}
                src={icon}
                alt=""
              />
            </span>
            <span>{ride.person}</span>
            <span style={{ marginLeft: "30px" }}>${ride.price}</span>
          </ListGroup.Item>
        </Card>
      </div>
      <div className="col-md-8">
        <GoogleMap></GoogleMap>
      </div>
    </div>
  );
};

export default Details;
