import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearToken = () => {
  AsyncStorage.removeItem("token");
};
export const clearStorage = () => {
  AsyncStorage.clear;
};

export const isTokenStoraged = () => {
  return !!AsyncStorage.getItem("token");
};

export const getTokenStoraged = () => {
  return JSON.parse(AsyncStorage.getItem("token"));
};

export const saveToken = (token) => {
  AsyncStorage.setItem("token", JSON.stringify(token));
};

export const getStorage = (data) => {
  return AsyncStorage.getItem(data);
};

export const setStorage = (key, value) => {
  return AsyncStorage.setItem(key, value);
};
