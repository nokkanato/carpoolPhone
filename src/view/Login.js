/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */
import { SafeAreaView, createSwitchNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {StyleSheet, TextInput} from 'react-native';
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import firebase from 'react-native-firebase'
import { Container, Button, Header, Content, Form, Item, Input, Label, Text, Icon } from 'native-base';
import { AppRegistry, View,Dimensions } from 'react-native';
import Landing from "./Landing";
import Signup from "./SignUp";
import firebase from 'firebase';
import { ImageBackground, Image } from 'react-native';

type Props = {};
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
class Login extends Component<Props> {
    constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authen: false
      };
    }

  signIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.setState({authen: true})
      console.log('in hereee')
      this.props.navigation.navigate('routeNameTwo')
      console.log('in hereee2')

    })
    .catch((error) =>{
      console.log(error)
    })

  }
  // this.props.navigation.navigate('Landing')

  render() {
    return (
    <ImageBackground source={{uri: '/Users/nattyauemanarom/Desktop/carpoolPhone/orgBlue.jpg'}} style={styles.bg}>
    <Container style={styles.container}>
        <Content>
        <Image source={{uri: '/Users/nattyauemanarom/Desktop/carpoolPhone/logoBlueT.png'}} style={{height: 211, width: width*0.9, flex: 1}}/>
          <Form style={styles.welcome}>
            <Item>
              {/* <Input /> */}
              <Icon active name='mail' />
              {/* <Icon ios='ios-menu'  style={{fontSize: 20, color: 'red'}}/> */}
              <Input placeholder="email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              />
            </Item>
            <Item>
            <Icon active name='lock' />
            {/* routeNameOne */}
              <Input placeholder="password"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              />
            </Item>
          </Form>
          <Button rounded warning onPress={() => this.signIn()} style={styles.butt}>
            <Text style={{paddingLeft:'41%'}}>SIGN IN</Text>
          </Button>
          <Button rounded info style={{marginTop:'3%', width: width*0.9}}>
            <Icon active name="logo-googleplus" />
            <Text style={{paddingRight:'35%'}} >GOOGLE+</Text>
          </Button>
          <Button rounded primary onPress={() => this.props.navigation.navigate('routeNameTwoTwo')} style={{marginTop:'3%', width: width*0.9}}>
            <Text style={{paddingLeft:'41%'}}>SIGN UP</Text>
          </Button>
        </Content>
      </Container>
      </ImageBackground>
    );
  }
}

export const AppNavigator = createSwitchNavigator({
  Login,
  routeNameTwo: Landing,
  // routeNameTwoTwo: Signup,
}, {
  Login,
  routeNameTwoTwo: Signup,
  // routeNameTwo: 'Landing'
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    width: width,
    paddingTop:height*0.2,
  },
  welcome: {
    // fontSize: 20,
    // textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  butt: {
      width: width*0.9,
      justifyContent: 'space-between',
  },
  carpool: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 100,
  },
  bg: {
    flex: 1,
  }
});
