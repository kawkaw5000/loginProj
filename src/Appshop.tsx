import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack'

// Screens
import Home from './screens/Home'
import Details from './screens/Details'
import { AuthStackParamList } from './route/AuthStack'
import Home2 from './screens/Home2'

export type RootStackParamList = {
  Home2: undefined;
  Details: {product: Product}
}

type AppShop = NativeStackScreenProps<AuthStackParamList, "AppShop">

const Stack = createNativeStackNavigator<AuthStackParamList>();


const AppShop = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name='Home2'
        component={Home2}
        options={{
          title: "Kawkaw Artshop Sample "
        }}
        />
        <Stack.Screen
        name='Details'
        component={Details}
        options={{
          title: "Product details"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppShop

