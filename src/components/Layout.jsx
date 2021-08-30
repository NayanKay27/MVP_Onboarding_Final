import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import "./NavMenu.css"

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        
        <Container className="container-box">
        <NavMenu/>
          {this.props.children}
        </Container>
        <div>
          <hr></hr>
        <footer className="style-footer"> ©2021 Onboarding Task </footer>
        </div>
      </div>
    );
  }
}
