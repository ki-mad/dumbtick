import React, { Component } from "react";
import { Container, Card, Image, Grid, Button, Icon, Header } from "semantic-ui-react";
import Headers from "../Component/Headers";
import Footer from "../Component/Footer";
import { connect } from "react-redux";
import { getEventById } from "../_actions/events";
import Moment from "react-moment";
import axios from "axios";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

class DetailEvent extends Component {
  state = {
    quantity: 1
  };

  incrementCount = () => {
    this.setState({
      quantity: this.state.quantity + 1
    });
  };

  decrementCount = () => {
    this.setState({
      quantity: this.state.quantity - 1
    });
  };

  // postDataPayment = () => {
  //   const event = this.props.event.dataEventById;
  //   const ticketPrice = event.price;
  //   const eventId = event.id;
  //   let qty = this.state.quantity;
  //   let total = qty * ticketPrice;

  //   let dataPayment = {
  //     event_id: eventId,
  //     user_id: localStorage.getItem("id"),
  //     status: "pending",
  //     qty: qty,
  //     totalPrice: total
  //   };
  //   console.log(dataPayment);

  //   axios
  //     .post("https://dumbtickapi.herokuapp.com/api/v2/payment", dataPayment)
  //     .then(
  //       res => {
  //         console.log(res);
  //       },
  //       err => {
  //         console.log("error", err);
  //       }
  //     );
  // };

  handleBuy = () => {
    if (localStorage.getItem("token")) {
      const event = this.props.event.dataEventById;
      const ticketPrice = event.price;
      const eventId = event.id;
      const id = localStorage.getItem("id");
      let qty = this.state.quantity;
      let total = qty * ticketPrice;

      let dataPayment = {
        event_id: eventId,
        user_id: localStorage.getItem("id"),
        status: "pending",
        qty: qty,
        totalPrice: total
      };
      // console.log(dataPayment);

      axios
        .post("https://dumbtickapi.herokuapp.com/api/v2/payment", dataPayment)
        .then(
          res => {
            window.location = `/payment/${id}`;
            console.log(res);
          },
          err => {
            console.log("error", err);
          }
        );
    }
    // const id = localStorage.getItem("id");
    // this.postDataPayment(id);
    // window.location = `/payment/${id}`;
    // console.log(this.state.payment);
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getEventById(id));
  }

  render() {
    const data = this.props.event.dataEventById;
    let { quantity } = this.state;
    const price = data.price * quantity;
    return (
      <div className="page-content" style={{ backgroundColor: "#F4E1E1" }}>
        <Headers />
        <Container style={{ paddingTop: "7em" }}>
          <Card.Group itemsPerRow={1}>
            <Card centered>
              <Image src={data.image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>
                  <Grid columns="equal" columns={2}>
                    <Grid.Row>
                      <Grid.Column floated="left">
                        <Container fluid>
                          <p>{data.title}</p>
                        </Container>
                      </Grid.Column>
                      <Grid.Column floated="right">
                        <Container fluid textAlign="right">
                          <p style={{ color: "#FF5555" }}>
                            {price > 0 ? "Rp. " + price : "Free"}
                          </p>
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns="equal" columns={2}>
                    <Grid.Column
                      width={6}
                      style={{ color: "#FF5555", fontSize: "1.2em" }}
                    >
                      {data.CategoryId && data.CategoryId.name}
                    </Grid.Column>
                    <Grid.Column
                      width={10}
                      floated="right"
                      style={{ textAlign: "right" }}
                    >
                      {localStorage.getItem("token") ? (
                        <div>
                          <Button
                            size="small"
                            icon="minus"
                            onClick={
                              quantity === 1 ? null : this.decrementCount
                            }
                          ></Button>
                          <span
                            style={{ paddingLeft: "5px", paddingRight: "8px" }}
                          >
                            {quantity}
                          </span>
                          <Button
                            size="small"
                            icon="plus"
                            onClick={this.incrementCount}
                          ></Button>
                          <Button
                            size="small"
                            color="green"
                            onClick={this.handleBuy}
                          >
                            BUY
                          </Button>
                        </div>
                      ) : (
                        <Container>
                          <p>You must login first to buy this event</p>
                        </Container>
                      )}
                    </Grid.Column>
                  </Grid>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid columns="equal" columns={3} centered>
                  <Grid.Column>
                    <Card.Header
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5em",
                        marginBottom: "1em"
                      }}
                    >
                      Hosted By
                    </Card.Header>
                    <Card.Description>
                      <Image
                        src={data.createdBy && data.createdBy.image}
                        size="tiny"
                      />
                      <span style={{ paddingLeft: "1.2em" }}>
                        {data.createdBy && data.createdBy.username}
                      </span>
                    </Card.Description>
                  </Grid.Column>
                  <Grid.Column>
                    <Card.Header
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5em",
                        marginBottom: "1em"
                      }}
                    >
                      Date & Time
                    </Card.Header>
                    <Card.Description>
                      <p>
                        <Icon name="calendar alternate outline"></Icon>
                        <Moment format="DD MMM YYYY">
                          {data.startTime}
                        </Moment> -{" "}
                        <Moment format="DD MMM YYYY">{data.endTime}</Moment>
                      </p>
                      <p>
                        <Icon name="time"></Icon>
                        {data.startTime &&
                          data.startTime.substring(11, 16)} -{" "}
                        {data.endTime && data.endTime.substring(11, 16)}
                      </p>
                    </Card.Description>
                  </Grid.Column>
                  <Grid.Column>
                    <Card.Header
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5em",
                        marginBottom: "1em"
                      }}
                    >
                      Date & Time
                    </Card.Header>
                    <Card.Description>
                      <p style={{ marginTop: "25px" }}>
                        <Icon name="address card"></Icon>
                        {data.createdBy && data.createdBy.username}
                      </p>
                      <p>
                        <Icon name="phone"></Icon>
                        {data.createdBy && data.createdBy.phonenumber}
                      </p>
                      <p>
                        <Icon name="mail"></Icon>
                        {data.createdBy && data.createdBy.email}
                      </p>
                    </Card.Description>
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          </Card.Group>
          <Grid
            divided
            stackable
            columns={2}
            style={{ marginTop: "2em", marginBottom: "2em" }}
          >
            <Grid.Column style={{ textAlign: "center" }}>
              <p>Event Description</p>
              <p style={{ textAlign: "left" }}>{data.description}</p>
            </Grid.Column>
            <Grid.Column style={{ justifyContent: "center" }}>
              <Header size="medium" textAlign="center">
                Location
              </Header>
              <iframe
                style={{
                  width: "25em",
                  height: "15em",
                  frameborder: "0px"
                }}
                src={data.urlMaps}
              ></iframe>
              <Header size="medium" textAlign="center">
                Share Event
              </Header>
              <Grid columns="divided" stretched stackable columns={3}>
                <Grid.Column>
                  <Button
                    size="mini"
                    color="twitter"
                    icon="twitter"
                    content="Twitter"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Button
                    size="mini"
                    color="facebook"
                    icon="facebook"
                    content="Facebook"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Button
                    size="mini"
                    color="grey"
                    icon="paperclip"
                    content="Copy Link"
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    //   category: state.category,
    event: state.events
  };
};

export default connect(mapStateToProps)(DetailEvent);
