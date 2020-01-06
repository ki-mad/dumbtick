import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import { getLogin } from "../_actions/login";
// import { useHistory } from "react-router-dom"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      err: false
    };
  }

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
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({
        err: true
      });
    } else {
      this.setState({
        err: false
      });
      axios
        .post("http://dumbtickapi.herokuapp.com/api/v2/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(res => {
          const data = res.data;
          // let history = useHistory();
          localStorage.setItem("id", data.user.id);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLogged", true);
          this.props.dispatch(getLogin(true));
          // history.push("/")
          window.location.reload();
        });
      console.log(username);
    }
  };

  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    // const { open } = this.state
    return (
        <Modal
          style={{
            height: "480px",
           position:"unset"
          }}
          size="small"
          trigger={<Button style={{fontWeight: "900", }}>Login</Button>}
          closeIcon
        >
            <Form style={{ paddingTop: "80px" }}>
              <Form.Field style={{ textAlign: "center" }}>
                <h1>LOGIN</h1>
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
              {/* <div style={{textAlign:"center"}}> */}
              <Button type="submit" onClick={this.handlePress}>
                Submit
              </Button>
              {/* </div> */}
              {this.state.error ? alert("All Field Required") : null}
            </Form>
        </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

export default connect(mapStateToProps)(Login);
