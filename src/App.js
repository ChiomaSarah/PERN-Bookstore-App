import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Books from "./components/Books";
import AddBook from "./components/AddBook";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/books" component={Books} />

        <Route path="/add-book" component={AddBook} />
      </Switch>
    </Router>
  );
}

export default App;
