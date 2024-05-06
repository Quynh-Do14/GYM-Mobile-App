import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearToken = () => {
  AsyncStorage.removeItem("token");
};
export const clearStorage = () => {
  AsyncStorage.clear;
};

export const isTokenStoraged = () => {
  const token = AsyncStorage.getItem("token").then(result => {
    return result
  });
  return !!token;
};

export const getTokenStoraged = () => {
  const token = AsyncStorage.getItem("token").then(result => {
    return result
  });
  return token;
};

export const saveToken = (token: any) => {
  AsyncStorage.setItem("token", token);
};

export const getStorage = (data: any) => {
  const storage = AsyncStorage.getItem(data).then(result => {
    return result
  });
  return storage;
};

export const setStorage = (key: any, value: any) => {
  return AsyncStorage.setItem(key, value);
};
