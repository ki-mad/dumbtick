import React, { Component } from "react";
import {
  Grid,
  Image,
  Icon,
  Responsive,
  List,
  Header,
  Segment,
  Container
} from "semantic-ui-react";
import logo from "../img/logodumbtick.png";

class Footer extends Component {
  render() {
    return (
      // <Grid stackable columns={3} style={{ color: "white", marginLeft:"4%" }}>
      //   <Grid.Row style={{ fontSize: "20px" }}>
      //     <Grid.Column style={{ paddingLeft: "2%", paddingTop: "2%" }}>
      //       <div style={{}}>
      //         <Image src={logo} />
      //         <div style={{ paddingTop: "3%" }}>
      //           dumb-tick - is a web-based platform that provides tickets for
      //           various events around sports, music, science and programming.
      //         </div>
      //       </div>
      //     </Grid.Column>
      //     <Grid.Column style={{ paddingLeft: "10%" }}>
      //       <div style={{ paddingTop: "8%" }}>
      //         <div>
      //           <div style={{ fontWeight: "900", paddingBottom: "2%" }}>
      //             Links
      //           </div>
      //           <div>About Us</div>
      //         </div>
      //         <div style={{ paddingTop: "5%" }}>
      //           <div style={{ fontWeight: "900", paddingBottom: "2%" }}>
      //             Follow US On
      //           </div>
      //           <div style={{ paddingBottom: "1%" }}>
      //             <Icon name="instagram"></Icon>Instagram
      //           </div>
      //           <div>
      //             <Icon name="twitter"></Icon>Twitter
      //           </div>
      //         </div>
      //       </div>
      //     </Grid.Column>
      //     <Grid.Column>
      //       <div style={{ paddingTop: "8%" }}>
      //         <div style={{ fontWeight: "900", paddingBottom: "2%" }}>
      //           Have A Question ?
      //         </div>
      //         <div
      //           style={{
      //             fontSize: "15px",
      //             fontWeight: "700",
      //             paddingBottom: "1%"
      //           }}
      //         >
      //           Dumb-tick
      //         </div>
      //         <div>Email: support@dumbtick.com</div>
      //       </div>
      //     </Grid.Column>
      //   </Grid.Row>
      //   <Grid.Row style={{ justifyContent: "center", fontSize: "15px" }}>
      //     <div style={{ paddingBottom: "1%" }}>Copyright 2019 Dumb-Tick</div>
      //   </Grid.Row>
      // </Grid>
      <Segment
        inverted
        vertical
        style={{ padding: "5em 0em", backgroundColor: "#FF5555" }}
      >
        <Container>
          <Grid divided inverted stackable columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Image src={logo} />
                <Container>
                  <Header inverted as="h4">
                    dumb-tick - is a web-based platform that provides tickets
                    for various events around sports, music, science and
                    programming.
                  </Header>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Header inverted as="h2">
                    Link
                  </Header>
                  <p>About Us</p>
                  <p style={{ fontWeight: "900", paddingBottom: "2%" }}>
                    Follow US On
                  </p>
                  <p>
                    <Icon name="instagram"></Icon>Instagram
                  </p>
                  <p>
                    <Icon name="twitter"></Icon>Twitter
                  </p>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Header as="h2" inverted>
                    Have A Question ?
                  </Header>
                  <Header as="h4" inverted>
                    Dumb-tick
                  </Header>
                  <p>Email: support@dumbtick.com</p>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default Footer;
