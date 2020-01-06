import React, { Component } from "react";
import { Container, Grid} from "semantic-ui-react";
import { connect } from 'react-redux'

import Header from "../Component/Header";
import Footer from "../Component/Footer";
import PaymentCard from "../Component/PaymentCard";

import { getPayment } from '../_actions/payment';

class Payment extends Component {

  componentDidMount() {
    const id = localStorage.getItem("id")
    console.log(id)
    this.props.dispatch(getPayment(id));
  }

  

  render() {
    const data = this.props.payment.dataPayment
    console.log(data)
    return (
      <div style={{position:"relative", minHeight:"100vh"}}>
        <div style={{ boxShadow: "black 0px 2px 12px 0px" }}>
          <Container fluid style={{ backgroundColor: "#FF5555" }}>
            <Header />
          </Container>
        </div>
        <Container
          fluid
          style={{
            backgroundColor: "#F4E1E1",
            paddingBottom: "3%",
            marginTop: "1%",
            paddingTop: "3%",
            minHeight: "100%",
            height:"100%"
          }}
        >
          <Grid style={style.grid}>
            <Grid.Row>
              <Grid.Column>
                <Container fluid>
                  <p
                    style={{
                      color: "#FF5555",
                      fontSize: "40px",
                      fontWeight: "bold"
                    }}
                  >
                    PAYMENT
                  </p>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid style={style.grid}>
            <Grid.Row columns={2} style={{paddingBottom:"0"}}>
              <Grid.Column style={style.column}>
                <Container>
                  <p style={{fontSize:"30px", fontWeight:"bold", paddingTop:"23px"}}>PAYMENT</p>
                </Container>
              </Grid.Column>
              <Grid.Column style={style.column2}></Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: "white", paddingTop:"0" }}>
              {data == null ? data.map(item => ( 
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
              )) : null}
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

const style = {
  grid: {
    marginLeft: "7%",
    marginRight: "7%"
  },

  sectionTitle: {
    color: "#FF5555",
    fontSize: "40px",
    fontWeight: "900"
  },

  paragraph: {
    fontSize: "30px",
    paddingLeft: "0"
  },

  column: {
    backgroundColor: "#FF5555",
    height: "100px",
    color: "white",
    verticalAlign: "middle",
    textAlign: "center"
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
