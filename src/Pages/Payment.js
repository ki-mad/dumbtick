import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import Headers from "../Component/Headers";
import Footer from "../Component/Footer";
import PaymentCard from "../Component/PaymentCard";

import { getPayment } from "../_actions/payment";

class Payment extends Component {
  componentDidMount() {
    const id = localStorage.getItem("id");
    console.log(id);
    this.props.dispatch(getPayment(id));
  }

  render() {
    const data = this.props.payment.dataPayment;
    console.log(data);
    return (
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "#F4E1E1"
        }}
      >
        <Headers />
        <Container
          style={{
            backgroundColor: "#F4E1E1",
            minHeight: "100%",
            height: "100%",
            paddingTop: "10em"
          }}
        >
          {/* <Container>
            <p style={style.sectionTitle}>PAYMENT</p>
          </Container> */}
          <Grid centered>
            <Grid.Row columns={2} style={{ paddingBottom: "0" }}>
              <Grid.Column style={style.column}>
                <Container>
                  <p
                    style={{
                      fontSize: "2em",
                      fontWeight: "bold",
                      paddingTop: "1em",
                      textAlign: "center"
                    }}
                  >
                    PAYMENT
                  </p>
                </Container>
              </Grid.Column>
              <Grid.Column style={style.column2}></Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid centered column={1} style={{ backgroundColor: "white", marginBottom:"2em" }}>
            <Grid.Row style={{ backgroundColor: "white", paddingTop: "0", paddingBottom:"2em"}}>
              {data.map(item => (
                <PaymentCard
                  id={item.id}
                  name={item.createdBy.username}
                  price={item.eventId.price}
                  qty={item.qty}
                  totalPrice={item.totalPrice}
                  title={item.eventId.title}
                  date={item.eventId.startTime}
                  address={item.eventId.address}
                  status={item.status}
                />
              ))}
            </Grid.Row>
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}

const style = {
  grid: {
    marginLeft: "7%",
    marginRight: "7%"
  },

  sectionTitle: {
    color: "#FF5555",
    fontSize: "40px",
    fontWeight: "900",
    marginBottom: "1.5em"
  },

  paragraph: {
    fontSize: "30px",
    paddingLeft: "0"
  },

  column: {
    backgroundColor: "#FF5555",
    height: "7em",
    color: "white"
  },

  column2: {
    borderBottom: "solid",
    borderBottomWidth: "15px",
    borderColor: "#FF5555"
  }
};

const mapStateToProps = state => {
  return {
    // user: state.user
    payment: state.payment
  };
};

export default connect(mapStateToProps)(Payment);
// export default Payment;
