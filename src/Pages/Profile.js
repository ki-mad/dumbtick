import React, { Component }  from 'react';
import { Container, Grid, Button, Image, Card } from 'semantic-ui-react';
import { connect } from 'react-redux'

import EditProfile from '../Component/EditProfile'
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { getUserById } from '../_actions/user';

class Profile extends Component {
    

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.dispatch(getUserById(id));
    }

    render() {
        const data = this.props.user.dataUserById
        return (
            <div>
                 <div style={{boxShadow:"black 0px 2px 12px 0px"}}>
                    <Container fluid style={{backgroundColor:"#FF5555"}}>
                        <Header/>
                    </Container>
                </div>
                <Container fluid style={{backgroundColor:"#F4E1E1", paddingBottom:"3%", marginTop:"1%", paddingTop:"3%",}}>
                    <Grid style={style.grid}>
                        <Grid.Row>
                            <Grid.Column>
                                <p style={style.sectionTitle}>PROFILE</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Container style={style.paragraph}>
                                    <p>{data.username}</p>
                                    <p>{data.phonenumber}</p>
                                    <p>{data.email}</p>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign="right">
                                    <EditProfile/>
                                </Container>
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                <Image spaced="right" src={data.image} size='medium' circular />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid style={style.grid}>
                        <Grid.Row>
                            <Grid.Column>
                                <p style={style.sectionTitle}>FAVORITE</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Card.Group itemsPerRow={4}>
                                {/* <Cards/> */}
                            </Card.Group>
                        </Grid.Row>
                    </Grid>
                </Container>
                <Container fluid style={{backgroundColor:"#FF5555"}}>
                    <Footer/>
                </Container>
            </div>
        )
    }
}

const style ={
    grid: {
        marginLeft:"8%", 
        marginRight:"6%", 
        marginTop:"4%"
    },

    sectionTitle: {
        color:"#FF5555", 
        fontSize:"40px", 
        fontWeight:"900"
        
    },

    paragraph: {
        fontSize:"30px",
        paddingLeft: "0"
    }

};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile);
// export default Profile;