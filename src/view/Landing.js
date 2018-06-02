import React from 'react'
import { SafeAreaView, createSwitchNavigator } from 'react-navigation';
import {StyleSheet, Text, View, Platform} from 'react-native'
import { Container, Header, Content, Tab, Tabs, Button, Icon, Left, Body, Title, Right } from 'native-base';
import Tab1 from './Driver';
import Tab3 from './Rider';
import Tab2 from './Home';


class Landing extends React.Component {
    render() {
        return (
        <Container>
            <Header hasTabs >
            <Left>
            </Left>
            <Body>
                <Title>Carpool</Title>
            </Body>
            <Right>
            </Right>
            </Header>
            <Tabs initialPage={1}>
            <Tab heading="Driver">
                <Tab1 />
            </Tab>
            <Tab heading="Tab2">
                <Tab2 />
            </Tab>
            <Tab heading="Rider">
                <Tab3 />
            </Tab>
            </Tabs>
        </Container>

        )
    }
}

export default Landing;


const AppNavigator = createSwitchNavigator({
    Tab1: Tab1
});

// const AppNavigator = createSwitchNavigator({
//     Login
// }, {
//     initialRouteName: 'Login'
// });
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#F5FCFF',
//       width: width,
//       paddingTop:height*0.3,  
//     }
// });