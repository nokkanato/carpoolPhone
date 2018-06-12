/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */
import { SafeAreaView, createSwitchNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {StyleSheet, TextInput} from 'react-native';
import { Container, Button, Header, Content, Form, Item, Input, Label, Text, Icon } from 'native-base';
import { AppRegistry, View,Dimensions } from 'react-native';
// import Login from "./Login";
import firebase from 'firebase';
import { ImageBackground, Image } from 'react-native';
import LOGO from '../logoBlueT.png'
import IMAGE from '../sunsetBlur.jpg'


type Props = {};
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
class SignUp extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      };
    }

    signUp = () => {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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
    <ImageBackground source={IMAGE} style={styles.bg}>
    <Container style={styles.container}>
        <Content>
        <Image source={LOGO} style={{height: 211, width: width*0.9, flex: 1}}/>
          <Form style={styles.welcome}>
            <Item>
              <Icon active name='mail' />
              <Input placeholder="email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              />
            </Item>
            <Item>
            <Icon active name='lock' />
              <Input placeholder="password"
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              />
            </Item>
          </Form>
          <Button rounded warning onPress={() => this.signUp()} style={styles.butt}>
            <Text style={{paddingLeft:'41%'}}>SIGN UP</Text>
          </Button>
        </Content>
      </Container>
      </ImageBackground>
    );
  }
}

export default SignUp;

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
