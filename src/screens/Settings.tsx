import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
//react native elements
import { FAB } from '@rneui/themed'
//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import {AppwriteContext} from '../appwrite/AppwriteContext'
import { useNavigation } from '@react-navigation/native';
import Login from './Login'
import {AuthStackParamList} from '../route/AuthStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStack } from '../route/AppStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


type SettingsScreenNavigationProp = NativeStackScreenProps<AuthStackParamList, "Settings">

const Settings = ({navigation}: SettingsScreenNavigationProp) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)
  const handleLogout = () => {
    appwrite.logout()
    .then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout Successful',
        duration: Snackbar.LENGTH_SHORT
      })
      navigation.navigate('Login');
    })
  }

  const handleSettingsPress = () => {
    navigation.navigate('EditProfile')
  
  };


  const handleSetDeletePress = () => {
    // Handle Set Notify button press
    navigation.navigate('DisableAcc')
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSettingsPress}>
        <View>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSetDeletePress}>
        <View>
          <Text style={styles.buttonText}>Disable account</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <View>
          <Text style={styles.buttonText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  buttonText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
