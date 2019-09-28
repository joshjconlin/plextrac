import React, { Fragment } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import {connect} from "react-redux";
import Login from "./Components/Login";
import TopBar from "./Components/TopBar";
import Register from "./Components/Register";
import Home from "./Components/Home";

const App = (props) => {
  if (!props.authenticated) {
      return (
          <Fragment>
              <TopBar />
              <Route path="/" exact component={Login} />
              <Route path="/register" exact component={Register} />
          </Fragment>
      );
  }
  return (
    <Fragment>
        <TopBar isAuthenticated />
        <Route path="/" component={Home} />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
      authenticated: state.authReducer.authenticated
  }
};

export default connect(mapStateToProps)(App);
