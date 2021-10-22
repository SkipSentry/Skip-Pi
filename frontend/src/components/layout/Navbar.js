import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const Navbarr = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navbar-fixed-top">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Skip-pi</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/positioning">Positioning</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/delete-stats/">Delete Stats</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            {" "}
            <i class="large material-icons" style={{ "font-size": "30px" }}>
              skip_next
            </i>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navbarr;
