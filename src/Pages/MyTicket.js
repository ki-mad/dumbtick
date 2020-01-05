import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import CardsTicket from "../Component/CardsTicket";
import { connect } from "react-redux";
import { getApprovedPayment } from "../_actions/payment";

class MyTicket extends Component {
    
  componentDidMount() {
    const id = localStorage.getItem("id");
    this.props.dispatch(getApprovedPayment(id));
  }
  render() {
    const data = this.props.payment.dataApprovedPayment;
    console.log(data)
    return (
      <div style={{ backgroundColor: "#F4E1E1" }}>
        <Header />
        <Container
          style={{
            width: "1700px",
            marginTop: "3em"
          }}
        >
          <p style={{ color: "#FF5555", fontSize: "3em", fontWeight: "bold" }}>
            My Ticket
          </p>
        </Container>
        <Container
          style={{
            width: "1700px",
            paddingBottom: "3em",
            marginTop: "3em",
            backgroundColor: "white",
            borderTop: "solid",
            borderTopWidth: "15px",
            borderColor: "#FF5555"
          }}
        >
          <Grid>
            <Grid.Row>
              {data.map(item => (
                <CardsTicket
                  id={item.id}
                  name={item.createdBy.username}
                  price={item.eventId.price}
                  title={item.eventId.title}
                  date={item.eventId.startTime}
                  address={item.eventId.address}
                  status={item.status}
                />
              ))}
            </Grid.Row>
          </Grid>
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
    // user: state.user
    payment: state.payment
  };
};

export default connect(mapStateToProps)(MyTicket);
// export default MyTicket;
