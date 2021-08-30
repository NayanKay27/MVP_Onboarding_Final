import React, { Component } from 'react';
import './NavMenu.css';
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'


export default class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'customer' };
  }


  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing inverted color="black">
          <Menu.Item>React</Menu.Item>
          <Menu.Item
            as={NavLink} to="/"
            name='customer'
            exact
          />
          <Menu.Item
            as={NavLink} to="/Product"
            name='Product'
            exact
          //onClick = {(e) => this.handleItemClick(e,'product')}
          // onClick={() => this.setState({ activeItem: 'Product' })}
          />
          <Menu.Item
            as={NavLink} to="/Store"
            name='store'
            exact
          />
          <Menu.Item
            as={NavLink} to="/Sales"
            name='sales'
            exact
          />
        </Menu>
      </div>
    );
  }
}
