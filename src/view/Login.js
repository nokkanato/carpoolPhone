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
import Driver from "./Driver";
import Rider from "./Rider";
import IMAGE from '../sunsetBlur.jpg'
import LOGOBLACK from '../logoBlack.png'


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
      alert(error)
      console.log(error)
    })

  }

  // this.props.navigation.navigate('Landing')

  render() {
    
    return (
    <ImageBackground source={ IMAGE } style={styles.bg}>
    <Container style={styles.container}>
        <Content>
        <Image source={ LOGOBLACK } style={styles.image}/>
          <Form style={styles.welcome}>
            <Item>
              {/* <Input /> */}
              <Icon active name='mail' size={50} style={{color: 'white'}} />
              {/* <Icon ios='ios-menu'  style={{fontSize: 20, color: 'red'}}/> */}
              <Input placeholder="a@a.com"
              autoCapitalize = 'none'
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              />
            </Item>
            <Item>
            <Icon active name='lock' size={50} style={{color: 'white'}}/>
            {/* routeNameOne */}
              <Input placeholder="aaaaaa"
              secureTextEntry
              autoCapitalize = 'none'
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              />
            </Item>
          </Form>
          <Button rounded bordered light onPress={() => this.signIn()} style={styles.butt}>
            <Text style={{paddingLeft:'41%'}}>SIGN IN</Text>
          </Button>
          <Button rounded bordered light onPress={() => this.props.navigation.navigate('signup')} style={{marginTop:'3%', width: width*0.9}}>
            <Text style={{paddingLeft:'41%'}}>SIGN UP</Text>
          </Button>
        </Content>
      </Container>
       </ImageBackground>
    );
  }
}


{/* <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}> */}
export const AppNavigator= createSwitchNavigator({
  Login,
  routeNameTwo: Landing,
  rider: Rider,
  driver: Driver,
  signup: Signup
  // routeNameTwoTwo: Signup,
}, {
  initialRouteName: 'Login'
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
    paddingTop: height*0.07,
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
  },
  image: {
    flex: 1,
    width: width*0.9,
    height: 180,
    resizeMode: 'contain',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'space-between',
  }
});
