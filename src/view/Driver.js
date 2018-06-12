import React from 'react'
import {StyleSheet, Text, View, Platform, Dimensions} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Card, CardItem } from 'native-base';
// import { Chip, Selectize as ChildEmailField } from 'react-native-material-selectize';
import EmailField from './EmailField';
import firebase, { database, auth, uid} from 'firebase';
import { ImageBackground, Image } from 'react-native';
import Modal from "react-native-modal";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Driver extends React.Component {

    state = {
      destination: '',
      time: '',
      cap: '',
      plate: '',
      price: '',
      des: [],
      show: null,
      isModalVisible: false,
    }
    _toggleModal = ()=>
    this.setState({ 
      isModalVisible: !this.state.isModalVisible,
     });

     again () {
      var uid = firebase.auth().currentUser.uid;

      var rideRef = firebase.database().ref("status/" + uid)
      rideRef.once("value", (x) => {
        if (!x.exists()) {
          this.setState({
            show: 'true'
          })
        } else {
          this.setState({
            show: null
          })
        } 
      })
     }
    componentWillMount() {
      var uid = firebase.auth().currentUser.uid;

      var rideRef = firebase.database().ref("status/" + uid)
      rideRef.once("value", (x) => {
        if (!x.exists()) {
          this.setState({
            show: 'true'
          })
        } else {
          this.setState({
            show: null
          })
        } 
      })

      }

    addNote = () => {
      var uid = firebase.auth().currentUser.uid;
      firebase.database().ref('notes/' + uid).set(
        {
          dest: this._emailField.state.destinations,
          time: this.state.time,
          cap: this.state.cap,
          plate: this.state.plate,
          price: this.state.price,
          status: 'driver'
        }
      ).then(() =>{
        firebase.database().ref('status/' + uid).set(
          {
            status: 'driver'
          }
        ).then(() => {
          again();
          this.setState({ isModalVisible: !this.state.isModalVisible });

        }).catch(() => {
          console.log('err')
        })
      }).catch((error) =>{
        console.log(error);
      })
    }

    static defaultProps = {
        items: [
          {
            email: 'เดอะมอลบางแค',
            name: 'The Mall Bangkae',
            initials: 'Mall'
          },
          {
            email: 'วิทยาลัยเขตศาลายา นครปฐม',
            name: 'Mahidol University',
            initials: 'MUIC'
          },
          {
            email: 'คริสตอลราขพฤษน์',
            name: 'Crysyal Ratchapuek',
            initials: 'CR'
          },
          {
            email: 'เดอะเซอเคิล',
            name: 'The Circle',
            initials: 'C'
          },
          {
            email: 'เซนทรัลศาลายา',
            name: 'Central Salaya',
            initials: 'CS'
          }
        ]
      };
      state = {
        isEnabled: false,
        message: '',
      };
      checkIsEnabled(isEnabled) {
        this.setState({ isEnabled });
      }
      onSendPress = () => {
        setTimeout(() => {
          if (!this._emailField.isErrored()) {
            const message = `Emails sent!\n\n${this._emailField.getSelectedEmails().join('\n')}`;
            // console.log('in');
            clearInterval(this.cancelMessage);
            this.setState({ message });
            this.cancelMessage = setTimeout(() => {
              this.setState({ message: '' });
            }, 2000);
          }
        });
      };

    state = {
        error: null
    }

    render() {
        const { items } = this.props;
        const { isEnabled, message } = this.state;

        if (this.state.show !== null) {
          return (
            <ImageBackground source={{uri: '/Users/nattyauemanarom/Downloads/carpoolPhone/blurred.jpg'}} style={styles.bg}>
            <Modal isVisible={this.state.isModalVisible} onSwipe={this._toggleModal} swipeDirection="down">
                <View style={styles.modalContent}>
                  <Text>Are you Sure </Text>
                  {/* <TouchableOpacity onPress={this._toggleModal}> */}
                  <Button rounded onPress={this.addNote} style={{backgroundColor: '#ff6700',width: width*0.55}}>
                    <Text style={{paddingLeft:'30%', fontSize: 20, color: 'white'}} >Set Ride</Text>
                  </Button>
                  {/* </TouchableOpacity> */}
                </View>
              </Modal>
              <Container style={styles.container}>
                  <Content>
                  <Form style={styles.form}>
                      <Item rounded last light style={{marginTop: height*0.02}}>
                      <EmailField
                          style={{width: width*0.9, color: 'white'}}
                          ref={c => this._emailField = c}
                          itemId="email"
                          items={items}
                          onSubmitEditing={isEnabled => this.checkIsEnabled(isEnabled)}
                          onChipClose={isEnabled => this.checkIsEnabled(isEnabled)}
                      />
                      </Item>
  
                      <Item rounded floatingLabel last light>
                      <Label style={styles.butt}>Leaving Time</Label>
                      <Input
                      placeholder={'time'}
                      onChangeText={(time) => this.setState({time})}
                      />
                      </Item>
  
                      <Item rounded floatingLabel last light>
                      <Label style={styles.butt}>Capacity</Label>
                      <Input
                      placeholder={'capacity'}
                      onChangeText={(cap) => this.setState({cap})}
                      />
                      </Item>
  
                      <Item rounded floatingLabel last light>
                      <Label style={styles.butt}>Plate Number</Label>
                      <Input
                        placeholder={'plate'}
                      onChangeText={(plate) => this.setState({plate})}
                      />
                      </Item>
  
                      <Item rounded floatingLabel last light>
                      <Label style={styles.butt}>Price</Label>
                      <Input
                        placeholder={'price'}
  
                      onChangeText={(price) => this.setState({price})}
                      />
                      </Item>
                      <Button rounded onPress={this._toggleModal} style={{backgroundColor: '#ff6700', marginTop:'5%', width: width*0.9}}>
                        <Text style={{paddingLeft:'35%', fontSize: 20, color: 'white'}} >SET A RIDE</Text>
                      </Button>
                  </Form>
                  </Content>
              </Container>
              </ImageBackground>
          )


        } else {
          return (
            <Card>
              <CardItem>
                <Text>You are currenly set a ride</Text>
              </CardItem>
            </Card>
          )

        }

       
    }
}

export default Driver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  form: {
    // width: width*0.9,
  },
  bg: {
    flex: 1,
  },
  butt: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }

});
