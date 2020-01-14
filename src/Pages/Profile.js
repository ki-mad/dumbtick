import React, { Component } from "react";
import {
  Container,
  Grid,
  Image,
  Card,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";

import EditProfile from "../Component/EditProfile";
import Headers from "../Component/Headers";
import Footer from "../Component/Footer";
import { getUserById } from "../_actions/user";
import { getFavorite } from "../_actions/favorite"
import CardsFav from "../Component/CardsFav"

class Profile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getUserById(id));
    this.props.dispatch(getFavorite(id));
  }

  render() {
    const data = this.props.user.dataUserById;
    const dataEvent = data.Favorites
    // console.log(dataEvent)   
    console.log(dataEvent)
    // const fav = this.props.favorite.dataFavorite;
    // const eventFav = this.props.favorite.dataFavorite.EventId
    // console.log(fav)
    console.log(data)
    return (
      <div style={{ backgroundColor: "#F4E1E1" }}>
        <Headers />
        <Container style={{ paddingBottom: "2em", paddingTop: "7em" }}>
          <Header style={style.sectionTitle}>PROFILE</Header>
          <Grid columns="equal" stackable centered>
            <Grid.Column>
              <Container style={style.paragraph}>
                <p>{data.username}</p>
                <p>{data.phonenumber}</p>
                <p>{data.email}</p>
              </Container>
            </Grid.Column>
            <Grid.Column width={3}>
              <EditProfile />
            </Grid.Column>
            <Grid.Column>
              <Image
                floated="right"
                src={data.image}
                size="medium"
                circular
                style={{ width: "15em", height: "15em" }}
              />
            </Grid.Column>
          </Grid>
          <Header style={style.sectionTitle}>FAVORITE</Header>
          <Card.Group itemsPerRow={4}>
            {dataEvent &&
              dataEvent.map(item => (
                <CardsFav
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  date={item.startTime}
                />
              ))}
          </Card.Group>
          {/* <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <p style={style.sectionTitle}>FAVORITE</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Card.Group itemsPerRow={4}> */}
          {/* <Cards/> */}
          {/* </Card.Group>
                        </Grid.Row>
                    </Grid> */}
        </Container>
        <Footer />
      </div>
    );
  }
}

const style = {
  grid: {
    marginLeft: "8%",
    marginRight: "6%",
    marginTop: "4%"
  },

  sectionTitle: {
    color: "#FF5555",
    fontSize: "3em",
    fontWeight: "900"
  },

  paragraph: {
    fontSize: "30px",
    paddingLeft: "0"
  }
};

const mapStateToProps = state => {
  return {
    user: state.user,
    favorite: state.favorite
  };
};

export default connect(mapStateToProps)(Profile);
// export default Profile;
