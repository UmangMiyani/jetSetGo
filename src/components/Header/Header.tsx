import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../theme';
import FastImage from 'react-native-fast-image';
import {AppImage} from '../../assets/icon';
import {AppConstant} from '../../constant';

interface headerProp {
  searchText: string;
  onChange: Function;
  onClose: Function;
  onPressFilter: Function;
}

const Header = (props: headerProp) => {
  const {
    searchText,
    onChange,
    onClose = () => null,
    onPressFilter = () => null,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={AppConstant.SEARCH_FLIGHT}
          style={styles.textInput}
          value={searchText}
          onChangeText={text => onChange(text)}
        />
        {searchText?.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.closeBtn}
            onPress={() => onClose()}>
            <Text style={styles.closeIcon}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.filterBtn}
        onPress={() => onPressFilter()}>
        <FastImage source={AppImage.filter} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  textInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 14,
    fontWeight: '500',
    flex: 1,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 8,
    paddingHorizontal: 4,
  },
  filterIcon: {
    width: 35,
    height: 35,
  },
  closeBtn: {
    width: 25,
    height: 25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue,
  },
  closeIcon: {
    fontWeight: 'bold',
  },
});

export default Header;
