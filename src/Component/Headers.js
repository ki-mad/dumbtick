import React, { Component } from "react";
import logo from "../img/logodumbtick.png";
import { Menu, Dropdown, Image, Container } from "semantic-ui-react";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

class Headers extends Component {
  handleLogout = () => {
    localStorage.clear();
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
              <Image href="/" size="tiny" src={logo} />
            </Menu.Item>
          </Menu.Menu>
          {localStorage.getItem("token") ? (
            <Menu.Menu position="right">
              <Menu.Item position="right">
                <Dropdown pointing trigger={trigger} icon={null}>
                  <Dropdown.Menu style={{ marginLeft: "-17px" }}>
                    <Dropdown.Item icon="user"
                      href={`/profile/${localStorage.getItem("id")}`}
                      text="Profile"
                    />
                    <Dropdown.Item icon="ticket" href="/my_ticket" text="My Ticket" />
                    <Dropdown.Item icon="payment" href={`/payment/${id}`} text="Payment" />
                    <Dropdown.Item icon="calendar" href="/add_event" text="Add Event" />
                    <Dropdown.Divider />
                    <Dropdown.Item
                      icon="share square outline"
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
  }
};

export default Headers;
