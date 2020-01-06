import React, { Component } from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";
// import favorite from "../img/favorite.png";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      favorited: false
    };
  }

  handleFavorite = () => {
    if (this.state.favorited) {
      axios
        .delete(
          `https://dumbtickapi.herokuapp.com/api/v2/favorite/delete`,

          {
            user_id: localStorage.getItem("id"),
            event_id: this.props.id
          }
        )
        .then(res => {
          this.setState({ favorited: res.data.isFav });
          // window.location.reload();
        });
    } else {
      axios
        .post(`https://dumbtickapi.herokuapp.com/api/v2/favorite`, {
          user_id: localStorage.getItem("id"),
          event_id: this.props.id
        })
        .then(res => {
          this.setState({ favorited: res.data.isFav });
        });
    }
  };

  componentDidMount() {
    axios
      .post(`https://dumbtickapi.herokuapp.com/api/v2/favorites`, {
        user_id: localStorage.getItem("id"),
        event_id: this.props.id
      })
      .then(res => {
        this.setState({ favorited: res.data.isFav });
      });
  }

  render() {
    const lengthDescription = this.props.description.length;
    const description = this.props.description;
    const price = this.props.price;
    console.log(this.state.favorite);
    return (
      <Card style={{ width: "347px" }}>
        <Image
          src={this.props.image}
          style={{ height: "260px", width: "395px" }}
        />
        <Card.Content>
          <Image floated="right" size="mini">
            {this.state.favorited === true ? (
              <Icon
                link
                name="heart"
                color="red"
                size="big"
                onClick={this.handleFavorite}
              ></Icon>
            ) : (
              <Icon link onClick={this.handleFavorite} name="heart outline" size="big" ></Icon>
            )}
          </Image>
          <Card.Header style={{ fontSize: "2em" }}>
            <Link
              to={`/event/${this.props.id}`}
              color="black"
              style={{ color: "black" }}
            >
              {this.props.title.substring(0, 15)}
            </Link>
          </Card.Header>
          <Card.Meta
            style={{ color: "#FF5555", fontSize: "20px", paddingTop: "10px" }}
          >
            <Moment format="DD MMM YYYY">{this.props.date}</Moment>
          </Card.Meta>
          <Card.Description style={{ fontSize: "15px" }}>
            {lengthDescription > 100
              ? description.substring(0, 100) + "..."
              : description}
          </Card.Description>
        </Card.Content>
        <Card.Content
          extra
          style={{ fontSize: "20px", fontWeigth: "400px", color: "#FF5555" }}
        >
          {price > 0 ? "Rp. " + price : "Free"}
        </Card.Content>
      </Card>
    );
  }
}

export default Cards;
