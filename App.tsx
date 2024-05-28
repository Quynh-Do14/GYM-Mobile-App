/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomMenu from './src/infrastructure/common/layouts/bottom-menu';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import LoginScreen from './src/screen/Auth/Login';
import Constants from './src/core/common/constants';
import EditProfile from './src/screen/InfoUser/editProfile';
import ForgotPasswordScreen from './src/screen/Auth/ForgotPassword';
import VerifyScreen from './src/screen/Auth/Verify';
import { RecoilRoot } from 'recoil';
import BookingSchedule from './src/screen/InfoUser/booking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangePasswordScreen from './src/screen/Auth/ChangePassword';
import WorkoutSessions from './src/screen/InfoUser/working';
import DetailBranchScreen from './src/screen/Branch/detailBranch';
import DetailRoomScreen from './src/screen/Room/detailRoom';
import BranchScreen from './src/screen/Branch';
import PackageScreen from './src/screen/Package';
import DetailPackageScreen from './src/screen/Package/detailPackage';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigation<any>();

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

  useEffect(() => {
    if (token) {
      navigate.navigate(Constants.Navigator.Navbar.value)
    }
    else {
      navigate.navigate(Constants.Navigator.Auth.LoginScreen.value)
    }
  }, [token])
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

      <Stack.Screen name={Constants.Navigator.Branch.BranchScreen.value} component={BranchScreen} />
      <Stack.Screen name={Constants.Navigator.Branch.DetailBranchScreen.value} component={DetailBranchScreen} />

      <Stack.Screen name={Constants.Navigator.Package.PackageScreen.value} component={PackageScreen} />
      <Stack.Screen name={Constants.Navigator.Package.DetailPackageScreen.value} component={DetailPackageScreen} />

      <Stack.Screen name={Constants.Navigator.Room.DetailRoomScreen.value} component={DetailRoomScreen} />

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
