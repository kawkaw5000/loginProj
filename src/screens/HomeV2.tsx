import { StyleSheet, Text, View, FlatList, Pressable, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'

//React navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import ProductItem from '../components/ProductItem'
import Separator from '../components/Separator'

//Data
import { PRODUCTS_LIST } from '../data/contants'
import { AuthStackParamList } from '../route/AuthStack'

type HomeProps = NativeStackScreenProps<AuthStackParamList, "Home2">

const Home = ({navigation}: HomeProps) => {
    const handleSettingsPress = () => {
        // Handle Settings button press
        console.log('Settings button pressed');
      };
    
      const handleSetNotifyPress = () => {
        // Handle Set Notify button press
        console.log('Set Notify button pressed');
      };
    
      const handlePicNotePress = () => {
        // Handle Pic Note button press
        console.log('Pic Note button pressed');
      };
      return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleSettingsPress}>
            <View>
              <Text style={styles.buttonText}>Settings</Text>
            </View>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.button} onPress={handleSetNotifyPress}>
            <View>
              <Text style={styles.buttonText}>Set Notify</Text>
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
      },
      button: {
        backgroundColor: '#3498db', // Example color, you can change it
        padding: 20,
        marginVertical: 10,
        borderRadius: 10, // Adjust this value for the desired button shape
      },
      buttonText: {
        textAlign: 'center',
        color: '#fff', // Example color, you can change it
        fontSize: 20,
        fontWeight: 'bold',
      },
    });