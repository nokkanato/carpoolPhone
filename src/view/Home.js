import React from 'react'
import Modal from "react-native-modal";
import {StyleSheet, Text, View, Platform, Dimensions} from 'react-native'
import { SafeAreaView, createSwitchNavigator , withNavigation} from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Body, Button } from 'native-base'
import firebase, { database, auth, uid} from 'firebase';
import Driver from './Driver';
import Rider from './Rider';
var width = Dimensions.get('window').width;
class Home extends React.Component {

  state = {
    driverId: '',
    data: [],
    err: '',
    status: '',
    isModalVisible: false,
  }
  


    componentDidMount() {
      var uid = firebase.auth().currentUser.uid;
      var refStatus = firebase.database().ref("status/" + uid);
      var refRider = firebase.database().ref("riding/" + uid);
      console.log('uiddd', uid)
      const self = this
      
      refStatus.once("value")
        .then(function(snap) {
          // Riding
          console.log('homeee')
          // console.log('lol', snap.exists())
          if (snap.exists()) {
            self.setState({ status: snap.val().status });
            if (self.state.status === 'driver') {
              console.log('it is driver')
              var refDriver = firebase.database().ref("notes/" + uid);
              refDriver.once("value", (driver) => {
                let lst = [];
                lst.push({
                  text: driver.val()
                })
                self.setState({ data: lst });
              })

            } else {
              var refRider = firebase.database().ref("riding/" + uid);
              refRider.once("value", (rider) => {
                var refDriver = firebase.database().ref("notes/" + rider.val().driver);
                console.log('it is rider')
                refDriver.once("value", (x) => {
                    console.log('vavlue', x.val());
                    let lst = [];
                    lst.push({
                      text: x.val()
                    })
                    console.log('lst', lst);
                    self.setState({ data: lst });
                })
              })
        
            }


          } else {
            console.log('Not existttttttttt')
            self.setState({
              data: null
            })            
          }
        })

    }

    againHome () {
      // this.setState({ 
      //   isModalVisible: false,
      //  });
      var uid = firebase.auth().currentUser.uid;
      var refStatus = firebase.database().ref("status/" + uid);
      var refRider = firebase.database().ref("riding/" + uid);
      const self = this
      
      refStatus.once("value")
        .then(function(snap) {
          // Riding
          console.log('homeee')
          // console.log('lol', snap.exists())
          if (snap.exists()) {
            self.setState({ status: snap.val().status });
            if (self.state.status === 'driver') {
              console.log('it is driver')
              var refDriver = firebase.database().ref("notes/" + uid);
              refDriver.once("value", (driver) => {
                let lst = [];
                lst.push({
                  text: driver.val()
                })
                self.setState({ data: lst });
              })

            } else {
              var refRider = firebase.database().ref("riding/" + uid);
              refRider.once("value", (rider) => {
                var refDriver = firebase.database().ref("notes/" + rider.val().driver);
                console.log('it is rider')
                refDriver.once("value", (x) => {
                    console.log('vavlue', x.val());
                    let lst = [];
                    lst.push({
                      text: x.val()
                    })
                    console.log('lst', lst);
                    self.setState({ data: lst });
                })
              })
        
            }


          } else {
            console.log('Not existttttttttt')
            self.setState({
              data: null
            })            
          }
        })

    }
    _toggleModal =  () =>
    this.setState({ 
      isModalVisible: !this.state.isModalVisible,
     });

    cancalRide = () => {
      this._toggleModal();
      var uid = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref("riding/" + uid);
      if (this.state.status === 'driver') {
        var ref = firebase.database().ref("notes/" + uid);
        ref.child.remove();
        var refStatus = firebase.database().ref("status/" + uid);
        refStatus.child.remove();
        this.againHome();
      } else {
        var ref = firebase.database().ref("riding/" + uid);
        ref.remove();
        var refStatus = firebase.database().ref("status/" + uid);
        refStatus.remove();
        this.againHome();

      }
    }
    render() {
      if (this.state.data !== null) {
        console.log('kaka Top', this.state.data)
      return (
        <Container>
        <View style={styles.container}>
          {this.props.children}
        </View>
        <Content>
  
        {
          this.state.data.map((data)=>
          <Card >
              <Modal isVisible={this.state.isModalVisible} onSwipe={this._toggleModal} swipeDirection="down">
                <View style={styles.modalContent}>
                  <Text>Are you Sure </Text>
                  {/* <TouchableOpacity onPress={this._toggleModal}> */}
                  <Button rounded onPress={() => this.cancalRide()} style={{backgroundColor: '#ff6700',width: width*0.55}}>
                    <Text style={{paddingLeft:'30%', fontSize: 20, color: 'white'}} >Yes</Text>
                  </Button>
                  {/* </TouchableOpacity> */}
                </View>
            </Modal>
            <CardItem header>
              <Text>Destination: {data.text.dest.join(", ")} </Text>
            </CardItem>
            <CardItem>
            <Text> You are currently : {this.state.status} </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Time : {data.text.time}
                </Text>
                <Text>
                  Capacity : {data.text.cap}
                </Text>
                <Text>
                  Plate: {data.text.plate}
                </Text>
                <Text>
                  Price: {data.text.price}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
            <Button rounded onPress={() => this._toggleModal()} style={{backgroundColor: '#ff6700', width: width*0.9}}>
              <Text style={{paddingLeft:'30%', fontSize: 20, color: 'white'}} >Cancel</Text>
            </Button>
            </CardItem>
          </Card>
          )
        }
        </Content>
        </Container>
      )}
      else {
        console.log('prop', this.props)
        
        return (
          <Container>
            <Card>
              <CardItem>
                <Text> You have not become anything</Text>
                </CardItem>
            </Card>
        </Container>
        )

      }
    }
  }

  const styles = StyleSheet.create({
    containter: {},
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    }
  });


  export default Home;

