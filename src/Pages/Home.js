import React, { Component } from "react";
import Headers from "../Component/Headers";
import Content from "../Component/Content";
import Footer from "../Component/Footer";

class Home extends Component {
  render() {
    return (
      <div>
        <Headers />
        <Content />
        <Footer />
      </div>
    );
  }
}
export default Home;
