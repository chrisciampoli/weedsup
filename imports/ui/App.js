import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

import Routes from './Routes';


class App extends Component {

  render() {
    return <Routes {...this.props} />;
  }
}

//TODO - move this to the sub components
export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(App);
