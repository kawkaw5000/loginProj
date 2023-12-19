import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import Signup from './screens/Signup';
import { AuthStackParamList } from './route/AuthStack';
import { AppStack } from './route/AppStack';
import Home2 from './screens/Home2';
import AppShop from './Appshop';
import Details from './screens/Details';
import Settings from './screens/Settings';
import CameraCap from './screens/CameraCap'
import EditProfile from './screens/EditProfile'
import DisableAcc from './screens/DisableAcc';



const Stack = createNativeStackNavigator<AuthStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
        <Stack.Screen options={{ headerShown: false }} name="CameraCap" component={CameraCap} />   
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />    
        <Stack.Screen options={{ headerShown: false }} name="DisableAcc" component={DisableAcc} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
