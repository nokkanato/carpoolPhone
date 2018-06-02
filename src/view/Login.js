/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, TextInput} from 'react-native';
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import firebase from 'react-native-firebase'
import { Container, Button, Header, Content, Form, Item, Input, Label, Text, Icon } from 'native-base';
import { AppRegistry, View,Dimensions } from 'react-native';
import Landing  from "./Landing"
type Props = {};
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
class Login extends Component<Props> {
    constructor(props) {
    super(props);
    this.state = { email: 'Useless Placeholder' };
    }
    
  render() {
    return (
    <Container style={styles.container}>
        <Content>
        <Text style={styles.carpool}>Carpool</Text>
          <Form style={styles.welcome}>
            <Item>
              {/* <Input /> */}
              <Icon active name='mail' />
              {/* <Icon ios='ios-menu'  style={{fontSize: 20, color: 'red'}}/> */}
              <Input placeholder="email"
              onChangeText={(email) => this.setState({email})}
              />
            </Item>
            <Item>
            <Icon active name='lock' />
            {/* routeNameOne */}
              <Input placeholder="password"
              onChangeText={(password) => this.setState({password})}
              />
            </Item>
          </Form>
          <Button rounded info onPress={() => this.props.navigation.navigate('routeNameTwo')} style={styles.butt}>
            <Text style={{paddingLeft:'41%'}}>SIGN IN</Text>
          </Button>
          <Button rounded danger style={{marginTop:'3%', width: width*0.8}}>
            <Icon active name="logo-googleplus" />
            <Text style={{paddingRight:'35%'}} >GOOGLE+</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: width,
    paddingTop:height*0.3,  
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  butt: {
      width: width*0.8,
      justifyContent: 'space-between',
  },
  carpool: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 100,
  },
});