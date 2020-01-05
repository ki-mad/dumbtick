import React, { Component } from "react";
import {
  Container,
  Card,
  Image,
  Grid,
  Button,
  Icon,
  Popup
} from "semantic-ui-react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { connect } from "react-redux";
import { getEventById } from "../_actions/events";
import Moment from "react-moment";
import axios from "axios";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser"

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

  postDataPayment = () => {
    const event = this.props.event.dataEventById;
    const ticketPrice = event.price;
    const eventId = event.id;
    let qty = this.state.quantity;
    let total = qty * ticketPrice;

    let dataPayment = {
      event_id: eventId,
      user_id: localStorage.getItem("id"),
      status: "pending",
      qty: qty,
      totalPrice: total
    };

    axios.post("http://localhost:5000/api/v2/payment", dataPayment).then(
      res => {
        console.log(res);
      },
      err => {
        console.log("error", err);
      }
    );
  };

  handleBuy = () => {
    const id = localStorage.getItem("id");
    this.postDataPayment(id);
    window.location.href = `/payment/${id}`;
    console.log(this.state.payment);
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getEventById(id));
    // console.log(this.state.totalPrice)
  }

  render() {
    const data = this.props.event.dataEventById;
    let { quantity } = this.state;
    const price = data.price * quantity;
    // const startTime = <Moment format="DD MMM YYYY">{data.startTime}</Moment>
    // const timeStart = data.startTime
    return (
      <div>
        <div style={{ boxShadow: "black 0px 2px 12px 0px" }}>
          <Container fluid style={{ backgroundColor: "#FF5555" }}>
            <Header />
          </Container>
        </div>
        <Container
          fluid
          style={{
            // marginRight: "7%",
            backgroundColor: "#F4E1E1",
            paddingBottom: "3%",
            paddingTop: "7%",
            marginTop: "1%"
          }}
        >
          <Grid>
            <Card centered style={{ width: "82%" }}>
              <Image src={data.image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>
                  <Grid
                    style={{
                      fontSize: "3em",
                      paddingTop: "14px",
                      paddingLeft: "4%",
                      paddingRight: "4%"
                    }}
                  >
                    <Grid.Row columns={2}>
                      <Grid.Column floated="left">{data.title}</Grid.Column>
                      <Grid.Column
                        floated="right"
                        style={{ textAlign: "right", color: "#FF5555" }}
                      >
                        {price > 0 ? "Rp. " + price : "Free"}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid style={{ paddingLeft: "4%", paddingRight: "4%" }}>
                    <Grid.Row columns={2}>
                      <Grid.Column
                        style={{ color: "#FF5555", fontSize: "25px" }}
                      >
                        {data.CategoryId && data.CategoryId.name}
                      </Grid.Column>
                      <Grid.Column
                        floated="right"
                        style={{ textAlign: "right" }}
                      >
                        <Button
                          size="medium"
                          icon="minus"
                          onClick={quantity === 1 ? null : this.decrementCount}
                        ></Button>
                        <span
                          style={{ paddingLeft: "5px", paddingRight: "8px" }}
                        >
                          {quantity}
                        </span>
                        <Button
                          size="medium"
                          icon="plus"
                          onClick={this.incrementCount}
                        ></Button>
                        {localStorage.getItem("token") ? (
                          <Button
                            size="medium"
                            color="green"
                            onClick={this.handleBuy}
                          >
                            BUY
                          </Button>
                        ) : (
                          <Popup
                            content="Login First"
                            on="click"
                            pinned
                            trigger={
                              <Button
                                size="medium"
                                color="green"
                                // onClick={this.handleBuy}
                                // disabled
                              >
                                BUY
                              </Button>
                            }
                          />
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid
                  centered
                  columns={3}
                  stackable
                  stretched
                  style={{
                    paddingTop: "14px",
                    paddingLeft: "4%",
                    paddingRight: "4%"
                  }}
                >
                  <Grid.Row style={{ fontSize: "20px" }}>
                    <Grid.Column>
                      <Container>
                        <p
                          style={{
                            fontSize: "2.3em",
                            fontWeight: "bold",
                            color: "black"
                          }}
                        >
                          Hosted By
                        </p>
                        <Image
                          src={data.createdBy && data.createdBy.image}
                          size="small"
                          verticalAlign="middle"
                        />{" "}
                        <span style={{ fontSize: "2em" }}>
                          {data.createdBy && data.createdBy.name}
                        </span>
                      </Container>
                    </Grid.Column>
                    <Grid.Column>
                      <Container>
                        <p
                          style={{
                            fontSize: "2.3em",
                            fontWeight: "bold",
                            color: "black"
                          }}
                        >
                          Date & Time
                        </p>
                      </Container>
                      <p>
                        <div>
                          <Icon name="calendar alternate outline"></Icon>
                          <Moment format="DD MMM YYYY">
                            {data.startTime}
                          </Moment>{" "}
                          - <Moment format="DD MMM YYYY">{data.endTime}</Moment>
                        </div>
                        <div>
                          <Icon name="time"></Icon>
                          {data.startTime &&
                            data.startTime.substring(11, 16)} -{" "}
                          {data.endTime && data.endTime.substring(11, 16)}
                        </div>
                      </p>
                    </Grid.Column>
                    <Grid.Column>
                      <Container>
                        <p
                          style={{
                            fontSize: "2.3em",
                            fontWeight: "bold",
                            color: "black"
                          }}
                        >
                          Contact Person
                        </p>
                      </Container>
                      <p>
                        <div>
                          <Icon name="address card"></Icon>
                          {data.createdBy && data.createdBy.username}
                        </div>
                        <div>
                          <Icon name="phone"></Icon>
                          {data.createdBy && data.createdBy.phonenumber}
                        </div>
                        <div>
                          <Icon name="mail"></Icon>
                          {data.createdBy && data.createdBy.email}
                        </div>
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Grid>
          <Container
            fluid
            style={{ marginLeft: "7%", marginRight: "", paddingTop: "3em" }}
          >
            <Grid
              columns={2}
              divided
              style={{ marginLeft: "9%", marginRight: "" }}
            >
              <Grid.Row>
                <Grid.Column width={8}>
                  <div style={{ textAlign: "center", alignItems:"center" }}>EVENT DESCRIPTION</div>
                  <div>{data.title}</div>
                  <div style={{ fontSize: "20px" }}>{data.description}</div>
                </Grid.Column>
                <Grid.Column width={8}>
                  <div style={{ textAlign: "center" }}>LOCATION</div>
                  <iframe style={{ width:"600px", height:"450px", frameborder:"0px"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15863.145812678567!2d106.73525875!3d-6.2917732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0092fae80c5%3A0x439cd2b52dc67b80!2sJurang%20Mangu!5e0!3m2!1sen!2sid!4v1578121373064!5m2!1sen!2sid"></iframe>
                  <div style={{ fontSize: "20px" }}>
                    {/* {data.description} */}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Container>
        <Container fluid style={{ backgroundColor: "#FF5555" }}>
          <Footer />
        </Container>
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
