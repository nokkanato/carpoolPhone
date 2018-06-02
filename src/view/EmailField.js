import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, Selectize as ChildEmailField } from 'react-native-material-selectize';

export default class EmailField extends Component {
  static defaultProps = {
    onChipClose: () => {},
    onSubmitEditing: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  focus = () => {
    this._childEmailField.focus();
  };

  blur = () => {
    this._childEmailField.blur();
  };

  getSelectedEmails = () => this._childEmailField.getSelectedItems().result;

  isErrored = () => {
    return !!this.state.error;
  }


  onSubmitEditing = email => {
    return (email);
  };

  onChipClose = onClose => {
    const { onChipClose } = this.props;
    const { error } = this.state;

    onChipClose(!error && this.getSelectedEmails().length > 1);
    onClose();
  }

  render() {
    const { items } = this.props;
    const { error } = this.state;

    return (
      <ChildEmailField
        ref={c => this._childEmailField = c}
        chipStyle={styles.chip}
        chipIconStyle={styles.chipIcon}
        error={error}
        itemId="email"
        items={items}
        label="destinations"
        listStyle={styles.list}
        tintColor="#028fb0"
        textInputProps={{
          onSubmitEditing: this.onSubmitEditing,
          onBlur: () => this._childEmailField.submit(),
          placeholder: 'Insert one or more emails',
          keyboardType: 'email-address'
        }}
        renderRow={(id, onPress, item) => (
          <TouchableOpacity
              activeOpacity={0.6}
              key={id}
              onPress={onPress}
              style={styles.listRow}>
            <View style={styles.listWrapper}>
              <View style={styles.listIcon}>
                <Text style={styles.listInitials}>{item.initials}</Text>
              </View>
              <View>
                <Text style={styles.listNameText}>{item.name}</Text>
                <Text style={styles.listEmailText}>{id}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderChip={(id, onClose, item, style, iconStyle) => (
          <Chip
            key={id}
            iconStyle={iconStyle}
            onClose={() => this.onChipClose(onClose)}
            text={id}
            style={style}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  chip: {
    paddingRight: 2
  },
  chipIcon: {
    height: 24,
    width: 24
  },
  list: {
    backgroundColor: '#fff'
  },
  listRow: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  listWrapper: {
    flexDirection: 'row'
  },
  listIcon: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    height: 40,
    width: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  listInitials: {
    fontSize: 20,
    lineHeight: 24,
    color: '#fff'
  },
  listNameText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 21
  },
  listEmailText: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 14,
    lineHeight: 21
  }
});