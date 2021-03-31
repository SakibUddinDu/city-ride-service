import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { RideContext } from '../../App';
import GoogleMap from '../GoogleMap/GoogleMap';
import Header from '../Header/Header';
import './DestinationSelect.css';


const DestinationSelect = () => {
    const [ride, setRide]= useContext(RideContext)
    // console.log(ride);
    // const data = FakeData;
    // data.find(destination => destination.id === rideId)

    // const [startDate, setStartDate] = useState(new Date("2020/10/01"));
    // const [endDate, setEndDate] = useState(new Date("2020/10/30"));


    return (
        <div className="container row" >
           <Header></Header>
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
           
                    <Link to={`/details/${ride.id}`}>
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







