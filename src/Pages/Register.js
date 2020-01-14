import React, { Component } from "react";
import { Button, Form, Modal, Grid } from "semantic-ui-react";
import axios from "axios";

export default class Regis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      name: "",
      err: false
    };
  }
  handleNameChange = event => {
    const input = event.target;
    const value = input.value;

    this.setState({ [input.name]: value }, () => {});
  };

  handleEmailChange = event => {
    const input = event.target;
    const value = input.value;

    this.setState({ [input.name]: value }, () => {});
  };

  handleUsernameChange = event => {
    const input = event.target;
    const value = input.value;

    this.setState({ [input.name]: value }, () => {});
  };

  handlePasswordChange = event => {
    const input = event.target;
    const value = input.value;

    this.setState({ [input.name]: value }, () => {});
  };

  handlePress = () => {
    const { username, password, email, name } = this.state;
    if (!username || !password || !name || !email) {
      this.setState({
        err: true
      });
    } else {
      this.setState({
        err: false
      });
      axios
        .post("https://dumbtickapi.herokuapp.com/api/v2/register", {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          name: this.state.name
        })
        .then(res => {
          const data = res.data;
          console.log(data);
          localStorage.setItem("id", data.dataUser.id);
          localStorage.setItem("name", data.dataUser.name);
          localStorage.setItem("username", data.dataUser.username);
          localStorage.setItem("email", data.dataUser.email);
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLogged", true);
          window.location.reload();
        });
    }
  };
  render() {
    return (
      <Grid>
        <Modal
          trigger={
            <Button inverted style={{ backgroundColor: "#FF5555" }}>
              Register
            </Button>
          }
          closeIcon
          // dimmer="blurring"
          style={{ position: "unset", height: "35em" }}
        >
          <Grid style={{ justifyContent: "center", verticalAlign: "middle" }}>
            <Form style={style.form}>
              <Form.Field style={{ textAlign: "center" }}>
                <h1>REGISTER</h1>
              </Form.Field>
              <Form.Field>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={this.handleNameChange}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.handleEmailChange}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleUsernameChange}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handlePasswordChange}
                  required
                />
              </Form.Field>
              <Form.Field style={{ textAlign: "center" }}>
                <Button primary type="submit" onClick={this.handlePress}>
                  Submit
                </Button>
              </Form.Field>
              {this.state.error ? alert("All Field Required") : <div></div>}
            </Form>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}

const style = {
  modal: {
    height: "2em"
  },

  form: {
    marginTop: "6em",
    width: "30em"
  }
};
