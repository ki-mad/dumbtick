import React, { Component } from "react";
import { Container, Grid, Button, Form, Input } from "semantic-ui-react";
import Headers from "../Component/Headers";
import Footer from "../Component/Footer";
import axios from "axios";

class AddEvent extends Component {
  user_id = localStorage.getItem("id");

  state = {
    addEvent: {
      title: "",
      category_id: null,
      user_id: this.user_id,
      startTime: null,
      endTime: null,
      price: 0,
      description: "",
      address: "",
      urlMaps: "",
      image: ""
      // phonenumber:
    },
    err: false
  };

  postdataEvent = () => {
    axios
      .post(
        "https://dumbtickapi.herokuapp.com/api/v2/event",
        this.state.addEvent
      )
      .then(
        res => {
          console.log(res);
        },
        err => {
          console.log("error", err);
        }
      );
    // this.props.dispatch(getCategoryById(id));
  };

  handleFromChange = event => {
    let addEventNew = { ...this.state.addEvent };
    localStorage.getItem("token");
    addEventNew[event.target.name] = event.target.value;
    this.setState(
      {
        addEvent: addEventNew
      },
      () => {
        // console.log('value ob addEvent: ', this.state.addEvent)
      }
    );
  };

  handleSubmit = () => {
    this.postdataEvent();
    console.log(this.state.addEvent);
  };

  render() {
    return (
      <Container fluid style={{ paddingLeft: "0", paddingRight: "0" }}>
        <Container
          fluid
          style={{ backgroundColor: "#FF5555", paddingTop: "5em" }}
        >
          <Headers />
        </Container>
        <Container
          fluid
          style={{
            backgroundColor: "#F4E1E1",
            paddingBottom: "3%"
            // marginTop: "18px"
          }}
        >
          <Container></Container>
          <Container style={{ paddingTop: "3%" }}>
            <Grid style={{ paddingBottom: "3%" }}>
              <Grid.Row>
                <Grid.Column>
                  <Container
                    style={{
                      color: "#FF5555",
                      fontSize: "40px",
                      fontWeight: "bold"
                    }}
                  >
                    ADD EVENT
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid centered>
              <Grid.Row>
                <Grid.Column>
                  <Form size="big">
                    <Form.Field>
                      <label>Title Event</label>
                      <input
                        placeholder="Title Event"
                        name="title"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Select
                      fluid
                      label="Category"
                      options=""
                      placeholder="Category"
                      name="category_id"
                    />
                    <Form.Field>
                      <label>Upload Pamflet</label>
                      {/* <input placeholder="Upload Pamflet"></input> */}
                      <Input
                        label={
                          <Button
                            style={{
                              backgroundColor: "#EE9E5D",
                              color: "white"
                            }}
                          >
                            Attachment Image
                          </Button>
                        }
                        labelPosition="right"
                        placeholder="Find domain"
                        name="image"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Start Time</label>
                      <input
                        name="startTime"
                        placeholder="Start Time"
                        type="datetime-local"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>End Time</label>
                      <input
                        name="endTime"
                        type="datetime-local"
                        placeholder="End Time"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Price</label>
                      <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Address Event</label>
                      <input
                        placeholder="Address Event"
                        name="address"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Url Map</label>
                      <input
                        placeholder="Url Map"
                        name="urlMaps"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Telp</label>
                      <input
                        placeholder="Telp"
                        name="phonenumber"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Email EO</label>
                      <input
                        placeholder="Email EO"
                        name="email"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Deskripsi Event</label>
                      <input
                        placeholder="Deskripsi Event"
                        name="description"
                        onChange={this.handleFromChange}
                      />
                    </Form.Field>
                    <Button
                      size="big"
                      fluid
                      color="green"
                      style={{ marginTop: "5%" }}
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Container>
        <Container fluid style={{ backgroundColor: "#FF5555" }}>
          <Footer />
        </Container>
      </Container>
    );
  }
}

export default AddEvent;
