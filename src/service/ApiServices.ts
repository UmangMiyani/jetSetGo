// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_CONSTANT} from '../constant';

const api = axios.create({
  baseURL: API_CONSTANT.BASE_URL,
  timeout: 10000,
});

const get = (endPoint: string) => {
  return new Promise((resolve, reject) => {
    api
      .get(endPoint)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export default get;
