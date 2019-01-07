import React, {Component} from 'react';
import AccountUIWrapper from './AccountUIWrapper'
import {Template} from "meteor/templating";
import {Blaze} from "meteor/blaze";
import ReactDOM from "react-dom";
import {Meteor} from "meteor/meteor";

class Account extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }


  render() {
    return (
      <div>
        <h2>My Account</h2>
        <span ref="container"/>;
      </div>
    );
  }
}

export default Account;
