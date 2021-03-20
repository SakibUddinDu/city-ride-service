import React, { useEffect, useState } from 'react';
import CardData from '../FakeData/CardData';
import Header from '../Header/Header';
import Transport from '../Transport/Transport';
import './Home.css';

const Home = () => {
    const [transports, setTransports] = useState([]);

    useEffect(() => {
        setTransports(CardData);
    }, [])

    return (
        <div className="row p-5 bgImage">
            <Header></Header>
         {
               transports.map(( transport)=><Transport  transport ={transport} key={transports.id}></Transport>)
           }
        </div>
    );
};

export default Home;