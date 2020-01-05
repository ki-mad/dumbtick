import React, { Component } from "react";
import { Card, Image, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import favorite from "../img/favorite.png";
import Moment from "react-moment";

class Cards extends Component {

  
  render() {
    const lengthDescription = this.props.description.length;
    const description = this.props.description;
    const price = this.props.price;
    return (
      <Card href={`/event/${this.props.id}`} style={{ width: "347px" }}>
        <Image
          src={this.props.image}
          style={{ height: "260px", width: "395px" }}
          hei
        />
        <Card.Content>
          <Button floated="right" circular style={{backgroundColor:"white"}}>
          <Image size="mini" src={favorite} />

          </Button>
          <Card.Header style={{ fontSize: "2em"}}>
              {this.props.title.substring(0, 15)}
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
