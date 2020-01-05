import React, { Component } from "react";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import DetailEvent from "./Pages/DetailEvent";
import Profile from "./Pages/Profile";
import Payment from "./Pages/Payment";
import AddEvent from "./Pages/AddEvent";
import MyTicket from "./Pages/MyTicket";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/Home" component = { Home }/> */}
          <Route path="/category/:id/event" component={Category} />
          <Route path="/event/:id" component={DetailEvent} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/payment/:id" component={Payment} />
          <Route path="/add_event" component={AddEvent}/>
          <Route path="/my_ticket" component={MyTicket}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
