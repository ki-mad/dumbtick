import React, { Component } from "react";
import { Container, Card, Message, Icon } from "semantic-ui-react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Grid } from "semantic-ui-react";
import Cards from "../Component/Cards";
import { connect } from "react-redux";
import { getEventByCategory } from "../_actions/events";
import { getCategoryById } from "../_actions/category";
import DatePicker from "react-datepicker";
import moment from "moment"

import "react-datepicker/dist/react-datepicker.css";

class Category extends Component {
  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getCategoryById(id));
    this.props.dispatch(getEventByCategory(id))
  }

  render() {
    const dataEvent = this.props.events.dataEventByCategory;
    const dataCategory = this.props.category.dataCategoryById;
    const data = dataCategory.Events;
    const isLoading = this.props.category.isLoading;

    const sortEvent = dataEvent.filter(dataEvent => {
      return (
        moment(new Date(dataEvent.startTime)).format("YYYY-MM-DD") ===
        moment(this.state.startDate).format("YYYY-MM-DD")
      );
    });

    switch (isLoading) {
      case true:
        return (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching that content for you.
            </Message.Content>
          </Message>
        );
      case false:
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
                marginLeft: "10%",
                marginRight: "7%",
                paddingBottom: "3%",
                backgroundColor: "#F4E1E1"
              }}
            >
              <Grid>
                <Grid.Row
                  style={{
                    marginLeft: "9%",
                    marginRight: "7%",
                    marginTop: "3%"
                  }}
                >
                  <div
                    style={{
                      color: "red",
                      fontSize: "40px",
                      fontWeight: "bold"
                    }}
                  >
                    {dataCategory && dataCategory.name}
                  </div>
                </Grid.Row>
                <Grid.Row style={{ marginLeft: "9%", marginRight: "7%" }}>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                  />
                </Grid.Row>
              </Grid>
              <Grid>
                <Grid.Row style={{ marginLeft: "7%", marginRight: "7%" }}>
                  <Grid.Column>
                    <Card.Group itemsPerRow={4}>
                      {sortEvent &&
                        sortEvent.map(item => (
                          <Cards
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            description={item.description}
                            price={item.price}
                            date={item.startTime}
                          />
                        ))}
                    </Card.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
            <Container fluid style={{ backgroundColor: "#FF5555" }}>
              <Footer />
            </Container>
          </div>
        );
      default:
        return <div></div>;
    }
  }
}

// }

// export default Category;
const mapStateToProps = state => {
  return {
    events: state.events,
    category: state.category,
    isLoading: state.category.isLoading
  };
};

export default connect(mapStateToProps)(Category);
