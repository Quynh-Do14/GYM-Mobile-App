/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomMenu from './src/infrastructure/common/layouts/bottom-menu';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screen/Auth/Login';
import Constants from './src/core/common/constants';
import EditProfile from './src/screen/InfoUser/editProfile';
import ForgotPasswordScreen from './src/screen/Auth/ForgotPassword';
import VerifyScreen from './src/screen/Auth/Verify';
import { RecoilRoot } from 'recoil';
import BookingSchedule from './src/screen/InfoUser/booking';
import { isTokenStoraged } from './src/infrastructure/utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangePasswordScreen from './src/screen/Auth/ChangePassword';
import WorkoutSessions from './src/screen/InfoUser/working';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const [token, setToken] = useState<any>()
  const getTokenStoraged = async () => {
    const token = await AsyncStorage.getItem("token").then(result => {
      if (result) {
        setToken(result)
      }
    });
    return token;
  };
  useEffect(() => {
    getTokenStoraged().then(() => { })
  }, [])
  console.log("token", token);

  return (
    <Stack.Navigator
      initialRouteName={Constants.Navigator.Auth.LoginScreen.value}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={Constants.Navigator.Navbar.value}
        component={BottomMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Constants.Navigator.Auth.LoginScreen.value} component={LoginScreen} />
      <Stack.Screen name={Constants.Navigator.InfoUserScreen.EditProfile.value} component={EditProfile} />
      <Stack.Screen name={Constants.Navigator.InfoUserScreen.BookingSchedule.value} component={BookingSchedule} />
      <Stack.Screen name={Constants.Navigator.InfoUserScreen.WorkoutSessions.value} component={WorkoutSessions} />
      <Stack.Screen name={Constants.Navigator.Auth.ForgotPasswordScreen.value} component={ForgotPasswordScreen} />
      <Stack.Screen name={Constants.Navigator.Auth.ChangePasswordScreen.value} component={ChangePasswordScreen} />
      <Stack.Screen name={Constants.Navigator.Auth.VerifyScreen.value} component={VerifyScreen} />
    </Stack.Navigator>
  );
};


function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
