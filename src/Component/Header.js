import React, { Component } from "react";
import logo from "../img/logodumbtick.png";
import {
  Grid,
  Menu,
  Dropdown,
  Image,
  Container,
  Input
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

class Header extends Component {
  handleLogout = () => {
    localStorage.clear();
    // this.context.history.push("/")
    window.location.href = "/";
  };

  render() {
    const id = localStorage.getItem("id");
    const trigger = (
      <span>
        <Image
          avatar
          src="https://s3.amazonaws.com/uifaces/faces/twitter/yesmeck/128.jpg"
          style={{ width: "40px", height: "40px" }}
          size="tiny"
        />
      </span>
    );
    return (
      <Menu secondary fixed="top" inverted style={style.Menu}>
        <Container>
          <Menu.Menu>
            <Menu.Item header>
              <Image
                href="/"
                size="tiny"
                src={logo}
              />
            </Menu.Item>
          </Menu.Menu>
          {localStorage.getItem("token") ? (
            <Menu.Menu position="right">
              <Menu.Item position="right">
                <Dropdown pointing trigger={trigger} icon={null}>
                  <Dropdown.Menu style={{ marginLeft: "-17px" }}>
                    <Dropdown.Item
                      href={`/profile/${localStorage.getItem("id")}`}
                      text="Profile"
                    />
                    <Dropdown.Item href="/my_ticket" text="My Ticket" />
                    <Dropdown.Item href={`/payment/${id}`} text="Payment" />
                    <Dropdown.Item href="/add_event" text="Add Event" />
                    <Dropdown.Divider />
                    <Dropdown.Item
                      text="Logout"
                      onClick={this.handleLogout}
                    ></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item>
                <Register />
              </Menu.Item>
              <Menu.Item>
                <Login />
              </Menu.Item>
            </Menu.Menu>
          )}
        </Container>
      </Menu>
    );
  }
}

// localStorage.getItem("token")
const style = {
  Menu: {
    backgroundColor: "#FF5555"
    // paddingLeft: "5vw",
    // paddingRight: "5vw"
  },

  container: {
    // marginLeft: "3%"
  }
};

export default Header;
