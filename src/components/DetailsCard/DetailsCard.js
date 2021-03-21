import React from 'react';
import { Card } from 'react-bootstrap';

const DetailsCard = ({data}) => {
    return (
  <Card
        style={{ width: "18rem" }}>

        <Card.Body>
          <Card.Title>Card Title </Card.Title>
          <Card.Text>
             <img style={{height: "70px", width: "70px"}} src={data.pic} alt=""/>
          </Card.Text>
        </Card.Body>
      </Card> 
    
    );
};

export default DetailsCard;