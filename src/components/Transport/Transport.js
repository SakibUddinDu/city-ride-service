import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { RideContext } from "../../App";




const Transport = ({ transport }) => {
  const  {id,name,pic} =transport;

  const [ride, setRide]= useContext(RideContext)

 const history= useHistory()
 const handleRide = () =>{
   history.push(`/destination/${id}`)
   setRide(transport)
 }
  return (
    // <div >
    // <Link to={`/registration/${vService.itemId}`} ></Link>
    // <Link to={"/booking/" + bookings.id}>
    // const {id} = useParams()
    //  <Link  className="col-md-3" to={`/destination/${transport.id}`} >
    //  <Link  className="col-md-3" to={`/destination/${id}`}>
 
      <Card onClick={handleRide} className="container" style={{ width: "15rem", height: "15rem" }}>
      <Card.Img variant="top" src={pic} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
    </Card>
   
  );
};

export default Transport;
