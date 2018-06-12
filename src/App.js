import React from 'react'
import { SafeAreaView, createSwitchNavigator } from 'react-navigation';
import {StyleSheet, Text, View, Platform} from 'react-native'
import Login  from "./view/Login"
import Landing  from "./view/Landing"

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
      'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
  
class App extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AppNavigator />
            </SafeAreaView>
        )
    }
}





export default App;