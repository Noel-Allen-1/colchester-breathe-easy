import React, { Component, useState, useEffect  } from "react";
import Link from 'next/link'
import { withRouter } from 'next/router'
import classNames from 'classnames'
const parse = require('html-react-parser');
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import {getCurrentUser, getRole} from "../api/auth";
let winh=0, winw=0, collapsed=false, auth=true;
function updateDimensions(){
  this.setState({ winw: window.innerWidth, winh: window.innerHeight });
};

export const NavLink = (props) => {

  let className = classNames({
    "nav-link": true,
    "is-active": props.pathname
  })
  return <Link href={props.path}><a className={className}>{props.label}</a></Link>

}
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); 
  return windowSize;
}
function hideNav() {
  var element = document.getElementById("basic-navbar-nav");
  element.classList.remove("show");
  this.setState({ collapsed: true });
}


function NavBarNew({ Component, pageProps }){
  const size = useWindowSize();
  return (
    <div>
    <Navbar bg="light" expand="lg" className="row">
       
      <div className="row" fluid="true">
          
          <Col className="col-xxl-6 col-xl-12">
          <h1 className="nav-title-block brand-mobile navbar-brand"><NavLink className="nav-title-block" path="/" label={"Colchester Breathe Easy"} /></h1>
          <h1 className="nav-title-block brand-desktop navbar-brand"><NavLink className="nav-title-block" path="/" label={"Colchester Breathe Easy"} /></h1>
          </Col>
          
         
          <Col className="col-xxl-6 col-xl-12">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" show={{ display: collapsed }}>
            <Nav className="mr-auto">
              <li className="nav-item">
              
                <NavLink
                  activeClassName="navbar__link--active"
                  className="navbar__link col  nav-link"
                  path="/"
                  onClick={hideNav}
                  label={<i className="fa fa-home  fa-3x"></i>}
                >
                </NavLink>
              </li>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <i className="fa fa-info-circle fa-3x" aria-hidden="true"></i><br></br>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <NavLink path="/about" onClick={hideNav} label="Whats On" />
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink path="/newsletters" onClick={hideNav} label="Newsletters" />
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink path="/privacy" onClick={hideNav} label="Privacy"/>
                  </DropdownItem>

                  <DropdownItem>
                    <NavLink path="/testimonials" onClick={hideNav} label="Testimonials" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="nav-item" onClick={hideNav}>
                <NavLink
                  activeClassName="navbar__link--active"
                  className="navbar__link col nav-link"
                  path="/meetings"
                  label={<i className="fa fa-calendar fa-3x" aria-hidden="true"></i>}
                />
              </li>
              <li className="nav-item" onClick={hideNav}>
                <NavLink path="/event" className="nav-link" label= {parseInt(winw) < 992
                    ? "Events Activities"
                    : parse(`Events
                  <br /> Activities`)} />
              </li>
              <li className="nav-item" onClick={hideNav}>
                <NavLink path="/exercise" className="nav-link" label= {parseInt(winw) < 992
                    ? parse(`Exercise &amp; Motivation`)
                    : parse(`Exercise
                  <br /> &amp; Motivation`)} />
                 
              </li>
              <li className="nav-item" onClick={hideNav}>
                <NavLink path="/singing" className="nav-link" label={parseInt(winw) < 992
                    ? "Singing for health"
                    : parse(`Singing
                  <br /> for health`)} />
                  
              </li>
              <li className="nav-item" onClick={hideNav}>
                <NavLink
                  activeClassName="navbar__link--active"
                  className="nav navbar__link col nav-link"
                  path="/news"
                  label={parseInt(winw) < 992
                    ? parse("News &amp; Information")
                    : parse(`News &amp;
                  <br /> Information`)}
                />
              </li>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <i className="fa fa-picture-o fa-3x" aria-hidden="true"></i><br></br>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <NavLink path="/gallery" onClick={hideNav} label="Gallery" />
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink path="/video" onClick={hideNav} label="Videos" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <i className="fa fa-phone-square fa-3x" aria-hidden="true"></i><br></br>
                </DropdownToggle>
                <DropdownMenu end>
                  {!getCurrentUser() && (
                    <React.Fragment>
                      <DropdownItem>
                        <NavLink path="/account/login" onClick={hideNav} label="Login">
                          <a>Login</a>
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink path="/account/register" onClick={hideNav} label="Registeration">
                          <a>Registration</a>
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink path="/download" onClick={hideNav} >
                          Membership Form
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink
                          activeClassName="navbar__link--active"
                          className="navbar__link col"
                          path="/contactUs"
                          onClick={hideNav}
                        >
                          Contact
                        </NavLink>
                      </DropdownItem>
                    </React.Fragment>
                  )}
                  {getCurrentUser() && (
                    <React.Fragment>
                      <DropdownItem>
                        <NavLink path="/logout" onClick={hideNav} label="Logout" />
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink path="/download" onClick={hideNav} label="Membership Form" />
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink
                          activeClassName="navbar__link--active"
                          className="navbar__link col"
                          path="/contactUs"
                          onClick={hideNav}
                          label="Contact"
                        />
                      </DropdownItem>
                     

                      {getRole() && getCurrentUser() && (
                        <DropdownItem>
                          <NavLink
                            activeClassName="navbar__link--active"
                            className="navbar__link col"
                            path="/stoppress/new"
                            onClick={hideNav}
                            label={<span style={{ color: "red" }}>Stop Press New</span>}
                          />
                            
                        </DropdownItem>
                      )}
                    </React.Fragment>
                  )}
                </DropdownMenu>
                <DropdownItem>
                        <NavLink
                          activeClassName="navbar__link--active"
                          className="navbar__link col"
                          path="/stoppress"
                          onClick={hideNav}
                        >
                          <span style={{ color: "red" }}>Stop Press</span>
                        </NavLink>
                      </DropdownItem>
              </UncontrolledDropdown>
            </Nav>
          </Navbar.Collapse>
          </Col>
      </div>
      
      <div className="row newsletter-link">
            <div className="col">
              <Link href="/newsletters">Newsletters</Link>
            </div>
          </div>
    </Navbar>   
    </div>
    )
}

export default NavBarNew;
