import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {get} from '../../service';
import {API_CONSTANT, AppConstant} from '../../constant';
import {FilterModal, FlightItem, Header} from '../../components';
import {Colors} from '../../theme';
import {itemDataProp, itemProp} from '../../utils/Types';

const FlightScreen = () => {
  const [data, setData] = useState([]);
  const [formatedData, setFormatedData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [emptyView, setEmptyView] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilterItem, SetSelectedFilterItem] = useState('');

  const flightData = formatedData?.length > 0 ? formatedData : data;

  const debounce = (
    func: {(e: string): void; apply?: any},
    delay: number | undefined,
  ) => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const fetchSearchResults = (e: string) => {
    let text = e?.toLowerCase();
    if (text?.length > 2) {
      let filteredName = data?.filter((item: itemProp) => {
        return item?.airline?.toLowerCase()?.match(text);
      });

      if (filteredName?.length === 0) {
        setEmptyView(true);
      } else if (Array.isArray(filteredName)) {
        setEmptyView(false);
        setFormatedData(filteredName);
      }
    } else if (text?.length === 0) {
      setFormatedData(data);
      setLoading(false);
      setEmptyView(false);
    }
  };

  const debouncedSearch = debounce(fetchSearchResults, 500);

  useEffect(() => {
    getFlightData();
  }, []);

  const getFlightData = () => {
    get(API_CONSTANT.FLIGHT_ID)
      .then((res: any) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch(_err => null)
      .finally(() => setLoading(false));
  };

  const renderItem = ({item}: itemDataProp) => {
    return <FlightItem item={item} />;
  };

  const onChange = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  const onClose = () => {
    setFormatedData([]);
    setEmptyView(false);
    setSearchText('');
    SetSelectedFilterItem('');
  };

  const onPressFilter = () => {
    setFilterModal(true);
  };

  const onModalClose = () => {
    setFilterModal(false);
  };

  const onFilterFlight = (filterVal: string) => {
    SetSelectedFilterItem(filterVal);
    const priceFilterData = JSON.parse(JSON.stringify(flightData));
    if (filterVal === AppConstant.CHEAPEST) {
      const lowestPriceGoods = priceFilterData.sort(
        (el1: {price: number}, el2: {price: number}) => el1.price - el2.price,
      );
      setFormatedData(lowestPriceGoods);
    } else {
      setFormatedData(searchText?.length > 0 ? priceFilterData : data);
    }
  };

  const mainContainer = () => {
    if (loading) {
      return (
        <View style={styles.centerView}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    } else if (emptyView) {
      return (
        <View style={styles.centerView}>
          <Text>{AppConstant.NO_DATA}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={flightData}
          extraData={flightData}
          renderItem={renderItem}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        searchText={searchText}
        onChange={onChange}
        onClose={onClose}
        onPressFilter={onPressFilter}
      />
      {mainContainer()}
      {filterModal && (
        <FilterModal
          isVisible={filterModal}
          selectedFilterItem={selectedFilterItem}
          onClose={onModalClose}
          onFilterFlight={onFilterFlight}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlightScreen;
