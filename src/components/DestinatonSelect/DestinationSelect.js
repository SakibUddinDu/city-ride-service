import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { RideContext } from '../../App';
import GoogleMap from '../GoogleMap/GoogleMap';
import './DestinationSelect.css';


const DestinationSelect = () => {
    const [ride, setRide]= useContext(RideContext)
    // const history = useHistory();
    // const { rideId } = useParams();
    // console.log(rideId)
    

    // const data = FakeData;
    // data.find(destination => destination.id === rideId)

    // const [startDate, setStartDate] = useState(new Date("2020/10/01"));
    // const [endDate, setEndDate] = useState(new Date("2020/10/30"));


    return (
        <div className="destination-details " >
            <div className="col-md-4">
                <Form className="booking-info bg-light p-5 m-5">
                    <Form.Group controlId="formBasicOrigin">
                        <Form.Label>Origin </Form.Label>
                        <Form.Control type="text" placeholder="Your Origin" />
                    </Form.Group>

                    <Form.Group controlId="formBasicDestination">
                        <Form.Label>Destination</Form.Label>
                        <Form.Control type="text" placeholder="Your Destination" />
                    </Form.Group>

                    {/* <Form.Group className=" d-flex mt-5">
                        <p>From</p>
                        <br />

                        <DatePicker
                            selected={startDate}

                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}

                            endDate={endDate}
                        />
                        <br />
                        <p>To</p>
                        <br />
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        /> 
                    </Form.Group>*/}
                    {/* <Link to={`/details/${transport.id}`}> */}
                    <Link to={`/details/${ride.id}`}>
                    {/* <Link to="/details"> */}
                        <Button variant="warning" type="submit" className="m-2 form-control"> Search</Button>
                    </Link>

                </Form>
                
            </div>
            <div className="col-md-8">
            <GoogleMap/>
            </div>
        </div>
    );
};

export default DestinationSelect;


// import React, { useState } from 'react';
// import './Places.css';
// import { locationData } from '../fakeDataLocation/fakeDataLocation';
// import Place from '../Place/Place';
// import { useHistory } from 'react-router-dom';

// const Places = () => {

//     const history = useHistory();

//     const [selectedPlace, setSelectedPlace] = useState(locationData[0]);

//     const handleClick = (data) => {
//         setSelectedPlace(data);
//     }

//     const handleBooking = () => {
//         history.push( `/booking/${selectedPlace.id}`);
//     }

//     return (
//         <div>
//             <div className="row">
//                 <div className="col-md-3 heading">
//                     <h1>{selectedPlace.name}</h1>
//                     <p>{selectedPlace.description}</p>
//                     <button onClick={handleBooking} className="custom-btn">Booking</button>
//                 </div>
//                 <div className="col-md-8 pictures">
//                 {
//                     locationData.map(place => <Place handleClick={handleClick} selectedPlace={selectedPlace} data={place}></Place>)
//                 }
                
//                 </div>
//             </div>
//         </div>
        
//     );
// };

// export default Places;





