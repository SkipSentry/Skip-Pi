import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbarr from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import DeleteStats from "./components/deletestats/DeleteStats";
import Positioning from "./components/positioning/Positioning";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbarr />

          <Route exact path="/" component={Dashboard} />
          <Route exact path="/delete-stats" component={DeleteStats} />
          <Route exact path="/Positioning" component={Positioning} />
        </div>
      </Router>
    );
  }
}
export default App;
