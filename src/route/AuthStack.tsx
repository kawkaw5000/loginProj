import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Signup from '../screens/Signup'
import Login from '../screens/Login'
import Home from '../screens/Home'
import Home2 from '../screens/Home2'
import Details from '../screens/Details'
import Settings from '../screens/Settings'
import HomeV2 from '../screens/HomeV2'
import CameraCap from '../screens/CameraCap'
import EditProfile from '../screens/EditProfile'
import DisableAcc from '../screens/DisableAcc'




export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    Camera: undefined;
    Home2: undefined;

    AppShop: undefined;
    Settings: undefined;
    HomeV2: undefined;
    CameraCap: undefined;
    EditProfile: undefined;
    DisableAcc: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();


export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Home2" component={Home2} />

      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CameraCap" component={CameraCap} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="DisableAcc" component={DisableAcc} />
    </Stack.Navigator>
  );
}




