// import { Route, Router, Switch } from 'react-router';
import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DestinationSelect from "./components/DestinatonSelect/DestinationSelect";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotMatched from "./components/NotMatched/NotMatched";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Details from "./Details/Details";


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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
          <Route path="/details/:id">
            <Details/>
          </Route>
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
    </UserContext.Provider>
  );
}

export default App;
