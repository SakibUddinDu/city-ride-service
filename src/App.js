// import { Route, Router, Switch } from 'react-router';
import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DestinationSelect from "./components/DestinatonSelect/DestinationSelect";
import Details from "./components/Details/Details";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotMatched from "./components/NotMatched/NotMatched";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


export const UserContext = createContext();
export const RideContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [ride, setRide] = useState({});


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <RideContext.Provider value={ [ride, setRide]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
{/*                     
           <Route path="/destination">
            <DestinationSelect />
          </Route> */}
          <PrivateRoute path="/details/:rideId">
            <Details/>
          </PrivateRoute>
          <PrivateRoute path="/destination">
            <DestinationSelect />
          </PrivateRoute>
          {/* <Route path="/bookedItems">
            <BookedItems />
          </Route> */}

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="*">
            <NotMatched />
          </Route>
        </Switch>
      </Router>
      </RideContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
