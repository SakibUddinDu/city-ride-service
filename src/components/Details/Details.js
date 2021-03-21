import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { RideContext } from "../../App";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import bookingDetailsData from "../FakeData/bookingDetailsData";

const Details = () => {
  const [ride, setRide]= useContext(RideContext)
  const data = bookingDetailsData;

  const { id } = useParams();
  console.log(id)

  data.find(destination => destination.id === id)
  return (
    <div>
      
      <div className="col-md-6">
      <Card
        style={{ width: "18rem" }}>

        <Card.Body>
          <Card.Title>{ride.id} </Card.Title>
          <Card.Text>
             <img style={{height: "70px", width: "70px"}} src={data.pic} alt=""/>
          </Card.Text>
        </Card.Body>
      </Card> 
        
    
      </div>
      <div className="col-md-6">
      <GoogleMap></GoogleMap>
      </div>

      
    </div>
  );
};

export default Details;
