import React, { Component } from "react";
import { Container, Grid, Image, Divider, Button } from "semantic-ui-react";
import Moment from "react-moment";
import logo from "../img/payment.png";
import axios from "axios";

class PaymentCard extends Component {
  putStatus = () => {
    const id = this.props.id
    axios.put(`http://localhost:5000/api/v2/payment/${id}`).then(
      res => {
        console.log(res);
        window.location.reload()
      },
      err => {
        console.log("error", err);
      }
    );
  };

  handlePress = () => {
    this.putStatus();
  };
  render() {
    const status = this.props.status
    // const data = this.props.user.dataUserById
    // const dateTime = this.props.date.subtring(12,16)
    return (
      <div>
        <Grid centered columns={2} style={{ paddingTop: "3%" }}>
          <Grid.Row>
            <Grid.Column
              style={{
                borderStyle: "solid",
                borderColor: "#FF5555",
                borderWidth: "40px"
                // borderLeftWidth: "45px"
              }}
            >
              <Grid columns={2} style={{ backgroundColor: "#BCBCBC" }}>
                <Grid.Column floated="left">
                  <Container>
                    <p style={{ fontSize: "25px", marginBottom: "0" }}>
                      {this.props.name}
                    </p>
                    <p style={{ fontSize: "20px", color: "grey" }}>
                      {this.props.id}
                    </p>
                  </Container>
                </Grid.Column>
                <Grid.Column floated="right" textAlign="right">
                  <Container>
                    <p style={{ fontSize: "17px" }}>
                      Face Value Rp.{this.props.price}
                    </p>
                    <p>-</p>
                  </Container>
                </Grid.Column>
              </Grid>
              <Grid columns={2}>
                <Grid.Column width={11} floated="left">
                  <Container style={{ verticalAlign: "middle" }}>
                    <p
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                        marginBottom: "2px"
                      }}
                    >
                      {this.props.title}
                    </p>
                    <p
                      style={{
                        fontSize: "17px",
                        color: "grey",
                        marginBottom: "3px"
                      }}
                    >
                      <Moment format="ddd. DDD MMM YYYY">
                        {this.props.date}
                      </Moment>
                    </p>
                    <p style={{ fontSize: "20px" }}>{this.props.address}</p>
                  </Container>
                </Grid.Column>
                <Grid.Column width={5} floated="right">
                  <Image
                    size="small"
                    floated="right"
                    src="https://store-images.s-microsoft.com/image/apps.33967.13510798887182917.246b0a3d-c3cc-46fc-9cea-021069d15c09.392bf5f5-ade4-4b36-aa63-bb15d5c3817a"
                  ></Image>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid centered columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Grid columns={2} stackable>
                <Grid.Column floated="left">
                  <Container>
                    <p
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        color: "grey",
                        marginBottom: "5px"
                      }}
                    >
                      Shopping Summary
                    </p>
                    <p style={{ fontSize: "20px", color: "grey" }}>
                      Total Price ({this.props.qty} Item)
                    </p>
                  </Container>
                </Grid.Column>
                <Grid.Column floated="right" textAlign="right">
                  <Container>
                    <p></p>
                    <p style={{ fontSize: "20px" }}>
                      Rp.{this.props.totalPrice}
                    </p>
                  </Container>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider style={{ marginLeft: "20%", marginRight: "20%" }} />
        <Grid centered columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Grid columns={2} stackable>
                <Grid.Column floated="left">
                  <Container>
                    <p
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        color: "grey",
                        marginBottom: "5px"
                      }}
                    >
                      Prove of payment
                    </p>
                    <p>Upload Payment Proof</p>
                    <Image size="small" src={logo}></Image>
                  </Container>
                </Grid.Column>
                <Grid.Column floated="right" textAlign="right">
                  <Container>
                    {status === "pending" ? <Button
                      onClick={this.handlePress}
                      size="big"
                      style={{ backgroundColor: "#FF5555", color: "white" }}
                    >
                      CONFIRM
                    </Button> : null }
                    {status === "confirmed" ? <Button
                      // onClick={this.handlePress}
                      size="big"
                      disabled
                      style={{ backgroundColor: "yellow", color: "white" }}
                    >
                      PENDING
                    </Button> : null }
                    {status === "approved" ? <Button
                      // onClick={this.handlePress}
                      disabled
                      size="big"
                      style={{ backgroundColor: "#FF5555", color: "white" }}
                    >
                      APPROVED
                    </Button> : null }
                  </Container>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default PaymentCard;
