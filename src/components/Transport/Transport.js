import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Transport = ({ transport }) => {
  return (
    // <div >
    // <Link to={`/registration/${vService.itemId}`} ></Link>
    // <Link to={"/booking/" + bookings.id}>
    // const {id} = useParams()
    //  <Link  className="col-md-3" to={`/destination/${transport.id}`} >
     <Link  className="col-md-3" to={"/destination"}>
 
      <Card className="container" style={{ width: "15rem", height: "15rem" }}>
      <Card.Img variant="top" src={transport.pic} />
      <Card.Body>
        <Card.Title>{transport.name}</Card.Title>
      </Card.Body>
    </Card>
      {/* </div> */}
    </Link>
  );
};

export default Transport;
