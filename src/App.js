import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Books from "./components/Books";
import AddBook from "./components/AddBook";

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />

        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/books">
          <Books />
        </Route>

        <Route path="/add-book">
          <AddBook />
        </Route>
      </Router>
    </Fragment>
  );
}

export default App;
