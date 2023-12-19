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
import Settings from './Settings'



type HomeScreenNavigationProp = NativeStackScreenProps<AuthStackParamList, "Home">

const Home = ({navigation}: HomeScreenNavigationProp) => {
  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  
  };

  const handleSetNotifyPress = () => {
    // Handle Set Notify button press
    console.log('Set Notify button pressed');
  };

  const handlePicNotePress = () => {
    // Handle Pic Note button press
    navigation.navigate('CameraCap');
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSettingsPress}>
        <View>
          <Text style={styles.buttonText}>Settings</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePicNotePress}>
        <View>
          <Text style={styles.buttonText}>Pic Note</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

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
