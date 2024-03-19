import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../theme';
import {AppConstant} from '../../constant';

const FilterModal = (props: {
  isVisible: boolean;
  onClose: Function;
  onFilterFlight: Function;
  selectedFilterItem: String;
}) => {
  const {isVisible, onClose, onFilterFlight, selectedFilterItem} = props;

  const onPressFilterMenu = (val: string) => {
    onFilterFlight(val);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.container}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}>
      <View style={styles.subContainer}>
        <Text style={styles.headerTitle}>{AppConstant.SELECT_PRICE}</Text>
        <TouchableOpacity
          style={[
            styles.btn,
            selectedFilterItem === AppConstant.CHEAPEST && styles.selectedBtn,
          ]}
          activeOpacity={0.5}
          onPress={() => onPressFilterMenu(AppConstant.CHEAPEST)}>
          <Text style={styles.btnText}>{AppConstant.CHEAPEST}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            selectedFilterItem === AppConstant.REGULAR && styles.selectedBtn,
          ]}
          activeOpacity={0.5}
          onPress={() => onPressFilterMenu(AppConstant.REGULAR)}>
          <Text style={styles.btnText}>{AppConstant.REGULAR}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  subContainer: {
    backgroundColor: Colors.secondary,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 8,
  },
  btn: {
    paddingVertical: 6,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 6,
  },
  selectedBtn: {
    borderWidth: 0.5,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '500',
  },
});

export default FilterModal;
