import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AppImage} from '../../assets/icon';
import moment from 'moment';
import {Colors} from '../../theme';
import {getFlightImg} from '../../utils';
import {itemDataProp} from '../../utils/Types';
import {AppConstant} from '../../constant';

const FlightItem = (props: itemDataProp) => {
  const {item} = props;

  const formatTime = (time: string) => moment(time).format('HH:mm');

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <FastImage
          source={getFlightImg(item?.airline)}
          style={styles.flightImage}
          resizeMode="contain"
        />
        <Text style={styles.airComapnyText}>{item?.airline}</Text>
      </View>
      <View style={styles.timingMainContainer}>
        <View style={styles.timingContainer}>
          <View style={styles.alignCenter}>
            <Text style={styles.flightTime}>
              {formatTime(item?.departureTime)}
            </Text>
            <Text style={styles.flightPlace}>{item?.origin}</Text>
          </View>

          <View>
            <Text style={styles.flightTimeInMinute}>
              {item?.duration
                ?.trim()
                ?.replace(/ hours/g, 'h')
                ?.replace(/ minutes/g, '')}
            </Text>
            <View style={styles.rowAlignCenter}>
              <View style={styles.airBorder} />
              <FastImage source={AppImage.flight} style={styles.icon} />
            </View>
          </View>
          <View style={styles.alignCenter}>
            <Text style={styles.flightTime}>
              {formatTime(item?.arrivalTime)}
            </Text>
            <Text style={styles.flightPlace}>{item?.destination}</Text>
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.flightSeat}>
          {`${item?.seatsAvailable} ${AppConstant.SEAT_LEFT}`}
        </Text>
        <Text style={styles.flightPrice}>{`₹ ${item?.price}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    paddingTop: 10,
    backgroundColor: Colors.secondary,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    elevation: 5,
  },
  subContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  flightImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.lightGrey,
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airBorder: {
    width: 60,
    height: 0.8,
    backgroundColor: Colors.grey,
    borderRadius: 100,
  },
  flightTime: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.primary,
  },
  flightPlace: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.grey,
    paddingTop: 3,
  },
  airComapnyText: {
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 10,
  },
  timingContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    width: '70%',
    paddingBottom: 15,
  },
  flightTimeInMinute: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.grey,
    paddingRight: 22,
  },
  timingMainContainer: {
    borderBottomWidth: 0.8,
    paddingHorizontal: 12,
    borderBottomColor: Colors.lightBlue,
  },
  flightPrice: {
    fontSize: 17,
    fontWeight: '500',
    paddingTop: 3,
  },
  flightSeat: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.grey,
  },
  priceContainer: {
    paddingVertical: 12,
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
});

export default FlightItem;
