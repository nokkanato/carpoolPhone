import React from 'react'
import { SafeAreaView, createSwitchNavigator } from 'react-navigation';
import {StyleSheet, Text, View, Platform, Dimensions} from 'react-native'
import { Container, Header, Content, Tab, Tabs, Button, Icon, Left, Body, Title, Right, TabHeading} from 'native-base';
import Tab1 from './Driver';
import Tab3 from './Rider';
import Tab2 from './Home';
import { ImageBackground, Image } from 'react-native';
import LOGO from '../logoWhite.png'


class Landing extends React.Component {
    render() {
        console.log('landing props', this.props.navigation)
        return (
        <Container >
            <Header hasTabs style={styles.container}>
            <Left>
            </Left>
            <Body>
              <Image source={LOGO} style={{width: 200, height: 35, resizeMode: "contain"}}/>
            </Body>
            <Right>
            </Right>
            </Header>
            <Tabs initialPage={1} tabBarUnderlineStyle={styles.tabBarUnderline}>
            <Tab heading={<TabHeading style={styles.nav} ><Text style={{color: 'white'}}>Driver</Text></TabHeading>}>
                <Tab1 />
            </Tab>
            <Tab heading={<TabHeading style={styles.nav} ><Text style={{color: 'white'}}>Home</Text></TabHeading>}>
                <Tab2 />
            </Tab>
            <Tab heading={<TabHeading style={styles.nav} ><Text style={{color: 'white'}}>Rider</Text></TabHeading>}>
                <Tab3 />
            </Tab>
            </Tabs>
        </Container>
        )
    }
}

export default Landing;


const AppNavigator = createSwitchNavigator({
    Tab2: Tab2
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#383838',
    color: 'white'
  },
  nav:{
    backgroundColor: '#454545',
    color: 'white'
  },
  tabBarUnderline: {
    backgroundColor: '#ff6700',
    height: 3
  }
});


