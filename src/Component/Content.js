import React, { Component } from "react";
import { Card, Input, Container, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { getCategories } from "../_actions/category";
import { getEvent } from "../_actions/events";
import moment from "moment";

import Cards from "./Cards";
import CardsCategory from "./CardsCategory";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(getCategories());
    this.props.dispatch(getEvent());
  }

  onChange = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    const category = this.props.category.dataCategory;
    const event = this.props.event.dataEvent;
    const { search } = this.state;
    const filteredEvents = event.filter(event => {
      return event.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    const todayEvents = event.filter(event => {
      return (
        moment(new Date(event.startTime)).format("YYYY-MM-DD") ===
        moment(new Date()).format("YYYY-MM-DD")
      );
    });

    const upcomingEvents = event.filter(event => {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      return (
        moment(new Date(event.startTime)).format("YYYY-MM-DD") ===
        moment(tomorrow).format("YYYY-MM-DD")
      );
    });

    return (
      <div className="page-content" style={{ backgroundColor: "#F4E1E1" }}>
        <Container style={{ paddingTop: "7em", paddingBottom:"3em" }}>
          <Input style={style.input}
            transparent
            size="huge"
            fluid
            icon="search"
            placeholder="Search..."
            onChange={this.onChange}
          />
          <Card.Group itemsPerRow={4}>
            {/* {category.map((el, i) => (
              <Card href={`/category/${el.id}/event`}>
                <Card.Content>
                  <Card.Header textAlign="center">{el.name}</Card.Header>
                </Card.Content>
              </Card>
            ))} */}
            {category.map(item => 
              <CardsCategory
              id={item.id}
              name={item.name}
              image={item.image}
              />
              )}
          </Card.Group>
          {search ?  <Card.Group itemsPerRow={3}>
            {filteredEvents &&
              filteredEvents.map(item => (
                <Cards
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  date={item.startTime}
                />
              ))}
          </Card.Group> :  
          <div>
          <Container fluid>
            <Header style={style.header}>TODAY</Header>
          </Container>
          <Card.Group itemsPerRow={4}>
            {todayEvents &&
              todayEvents.map(item => (
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
          <Container fluid>
            <Header
              style={style.header}
            >
              UPCOMING EVENT
            </Header>
          </Container>
          <Card.Group itemsPerRow={4}>
            {upcomingEvents &&
              upcomingEvents.map(item => (
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
              </div> }
        </Container>
      </div>
    );
  }
}

const style = {
  header: {
    color: "#FF5555",
    fontSize: "3em",
    fontWeight: "bold",
    marginTop: "1.5em",
    marginBottom: "1.5em"
  },

  input: {
    backgroundColor: "#F4E1E1",
    marginBottom: "2%",
    borderBottom: "0.1em solid black"
  }
};

const mapStateToProps = state => {
  return {
    category: state.category,
    event: state.events
  };
};

export default connect(mapStateToProps)(Content);
