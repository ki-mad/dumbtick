import React, { Component } from "react";
import {
  Button,
  Form,
  Modal,
  Grid,
  Image,
  Container,
  Header
} from "semantic-ui-react";
import axios from "axios";
import { getLogin } from "../_actions/login";

class EditProfile extends Component {
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
        .post("http://localhost:5000/api/v2/login", {
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
    return (
      <Container>
        <Modal centered size="small"
          trigger={<Button>Show Modal</Button>}
          style={{ position: "unset" }}
        >
          <Modal.Header>Edit Profile</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Username</label>
                <input placeholder="Username" />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <input placeholder="Phone Number" />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input placeholder="Email" />
              </Form.Field>
              <Button fluid type="submit">Edit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    );
  }
}



export default EditProfile;
