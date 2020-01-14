import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class CardsCategory extends Component {
  render() {
    const id = this.props.id;
    const image = this.props.image;
    return (
      <Card
        href={`/category/${id}/event`}
        style={{
          backgroundImage:
            `url(${image})`
        }}
      >
        <Card.Content>
          <Card.Header textAlign="center">{this.props.name}</Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

export default CardsCategory;
