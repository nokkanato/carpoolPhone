import React from 'react'
import {StyleSheet, Text, View, Platform} from 'react-native'
import { Container, Header, Content, Card, CardItem, Body } from 'native-base'


class Rider extends React.Component {
    render() {
        return (
          <Container>
          <Content>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  //Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
          </Content>
          </Container>
        )
    }
}

export default Rider;
