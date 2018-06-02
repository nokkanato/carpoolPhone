import React from 'react'
import {StyleSheet, Text, View, Platform} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
// import { Chip, Selectize as ChildEmailField } from 'react-native-material-selectize';
import EmailField from './EmailField'; 

class Driver extends React.Component {
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
            <Container>
                <Content>
                <Form>
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
                    <Label>Destination</Label>
                    <Input />
                    </Item>
                    <Item floatingLabel last>
                    <Label>Leaving Time</Label>
                    <Input />
                    </Item>
                    <Item floatingLabel last>
                    <Label>Capacity</Label>
                    <Input />
                    </Item>
                    <Item floatingLabel last>
                    <Label>Plate Number</Label>
                    <Input />
                    </Item>
                    <Item floatingLabel last>
                    <Label>Price</Label>
                    <Input />
                    </Item>
                    <Item last>
                    <Label>Taken</Label>
                    </Item>
                </Form>
                </Content>
            </Container>
        )  
    }
}

export default Driver;