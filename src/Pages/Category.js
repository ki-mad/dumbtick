import React, { Component } from "react";
import { Container, Card, Message, Icon } from "semantic-ui-react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Cards from "../Component/Cards";
import { connect } from "react-redux";
import { getEventByCategory } from "../_actions/events";
import { getCategoryById } from "../_actions/category";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class Category extends Component {
  state = {
    startDate: new Date()
    // startDate: null
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getCategoryById(id));
    this.props.dispatch(getEventByCategory(id));
  }

  render() {
    const dataEvent = this.props.events.dataEventByCategory;
    const dataCategory = this.props.category.dataCategoryById;
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
          <div className="page-content" style={{ backgroundColor: "#F4E1E1" }}>
            <Header />
            <Container
              style={{
                paddingTop: "7em",
                marginBottom: "2em"
              }}
            >
              <p style={style.header}>{dataCategory && dataCategory.name}</p>
              <DatePicker 
                selected={this.state.startDate} 
                onChange={this.handleChange}
              />
              <Card.Group itemsPerRow={4} style={{paddingTop:"1.8vh"}}>
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
            </Container>
            <Footer />
          </div>
        );
      default:
        return <div></div>;
    }
  }
}

const style = {
  header: {
    color: "#FF5555",
    fontSize: "3em",
    fontWeight: "bold",
    marginTop: "1.5em"
  },

  input: {
    backgroundColor: "#F4E1E1",
    marginBottom: "2%",
    borderBottom: "0.1em solid black"
  }
};

const mapStateToProps = state => {
  return {
    events: state.events,
    category: state.category,
    isLoading: state.category.isLoading
  };
};

export default connect(mapStateToProps)(Category);
