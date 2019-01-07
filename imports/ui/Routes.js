import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Meteor} from 'meteor/meteor';

import AppNavBar from './components/primary-nav/AppNavBar';
import Account from './components/account';
import Favorites from './components/favorites';
import Search from './components/search';

import AccountUIWrapper from "./components/account/AccountUIWrapper";


class Routes extends Component {
  render() {
    console.log(this.props);
    let login;
    let app;
    //I also hate everything about this, need to ensure a user is logged
    if (!Meteor.userId()) {
      login = (<Redirect to="/login"/>);
    } else {
      app = (
        <Fragment>

        </Fragment>
      )
      login = (<Redirect to="/app"/>);
    }
    return (
      <Router>
        <Fragment>
          <AppNavBar/>
          <div className="container-fluid" style={{marginTop: '5rem'}}>
            <Switch>
              <Route exact path="/app/" component={Search}/>
              <Route exact path="/app/favorites" component={Favorites}/>
              <Route exact path="/app/account" component={Account}/>
              <Route exact path="/login" component={AccountUIWrapper}/>
              {login}
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
