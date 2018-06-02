import React from 'react'
import {StyleSheet, Text, View, Platform, Dimensions} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
// import { Chip, Selectize as ChildEmailField } from 'react-native-material-selectize';
import EmailField from './EmailField';
import firebase from 'firebase';

var width = Dimensions.get('window').width;

class Driver extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        destination: '',
        time: '',
        cap: '',
        plate: '',
        price: '',
       };
    }

    addNote = () => {
      firebase.database().ref('notes/001').set(
        {
          dest: this.state.destination,
          time: this.state.time,
          cap: this.state.cap,
          plate: this.state.plate,
          price: this.state.price
        }
      ).then(() =>{
        console.log('insert done');
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
        message: ''
      };
      checkIsEnabled(isEnabled) {
        this.setState({ isEnabled });
      }
      onSendPress = () => {
        this._emailField.blur();
        setTimeout(() => {
          if (!this._emailField.isErrored()) {
            const message = `Emails sent!\n\n${this._emailField.getSelectedEmails().join('\n')}`;

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

        return (
            <Container style={styles.container}>
                <Content>
                <Form style={styles.form}>
                    <Item>
                    <EmailField
                        ref={c => this._emailField = c}
                        itemId="email"
                        items={items}
                        onSubmitEditing={isEnabled => this.checkIsEnabled(isEnabled)}
                        onChipClose={isEnabled => this.checkIsEnabled(isEnabled)}
                    />
                    </Item>

                    <Item floatingLabel last>
                    <Input
                    placeholder="Destination"
                    onChangeText={(destination) => this.setState({destination})}
                    />
                    </Item>

                    <Item floatingLabel last>
                    <Input
                    placeholder="Leaving Time"
                    onChangeText={(time) => this.setState({time})}
                    />
                    </Item>

                    <Item floatingLabel last>
                    <Label>Capacity</Label>
                    <Input
                    onChangeText={(cap) => this.setState({cap})}
                    />
                    </Item>

                    <Item floatingLabel last>
                    <Label>Plate Number</Label>
                    <Input
                    onChangeText={(plate) => this.setState({plate})}
                    />
                    </Item>

                    <Item floatingLabel last>
                    <Label>Price</Label>
                    <Input
                    onChangeText={(price) => this.setState({price})}
                    />
                    </Item>

                    <Item last>
                    <Label>Taken</Label>
                    </Item>
                    <Button rounded danger onPress={() => this.addNote()} style={{marginTop:'5%', width: width*0.9}}>
                      <Text style={{paddingLeft:'35%', fontSize: 20, color: 'white'}} >SET A RIDE</Text>
                    </Button>
                </Form>
                </Content>
            </Container>
        )
    }
}

export default Driver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: width,
  },
  form: {
    // width: width*0.9,
  }
});
