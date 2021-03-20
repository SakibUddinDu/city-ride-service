import React, { useContext } from "react";
import { Card } from "react-bootstrap";
// import { useParams } from "react-router";
import { UserContext } from "../App";
import GoogleMap from "../components/GoogleMap/GoogleMap";

const Details = () => {
//  const {id}=useParams();
 


  return (
    <div>
  
      <Card
        style={{ width: "18rem" }}>
        <Card.Header>From:
          <br/>
          To:
        </Card.Header>
        <Card.Body>
          <Card.Title>Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>

      <GoogleMap></GoogleMap>
    </div>
  );
};

export default Details;
