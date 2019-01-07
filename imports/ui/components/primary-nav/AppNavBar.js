import React, {Component, Fragment} from 'react';
import PropTypes from 'proptypes';
import {
  Collapse,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler,
  UncontrolledDropdown
} from 'reactstrap';
import {Link} from 'react-router-dom';


class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    console.log(this.state.isOpen);
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  render() {
    return (
      <Navbar color="primary" light expand="md" fixed="top">
        <NavbarBrand href="/">FoodsUp</NavbarBrand>
        <NavbarToggler onClick={this.toggle.bind(this)}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavLink tag={Link} to="/app/">
              Search
            </NavLink>
            {Meteor.user() ? <NavLink tag={Link} to="/app/favorites">
              Favorites
            </NavLink> : null}

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/app/account">
                  Account
                </DropdownItem>
                {/*<DropdownItem>*/}
                {/*Option 2*/}
                {/*</DropdownItem>*/}
                {/*<DropdownItem divider />*/}
                {/*<DropdownItem>*/}
                {/*Reset*/}
                {/*</DropdownItem>*/}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

AppNavBar.propTypes = {
  onNavClick: PropTypes.func
};

AppNavBar.contextTypes = {
  router: PropTypes.object
};

export default AppNavBar;
