import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
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

type HomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>;

type UserObj = {
  name: String;
  email: String;
}



const Home = () => {
  const [userData, setUserData] = useState<UserObj>()
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)
  const navigation = useNavigation<HomeScreenNavigationProp>();


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

  useEffect(() => {
    appwrite.getCurrentUser()
    .then(response => {
      if (response) {
        const user: UserObj = {
          name: response.name,
          email: response.email
        }
        setUserData(user)
      }
    })
  }, [appwrite])
  

  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{
              uri: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/333412901_534598085327650_1747498840451788705_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeF-N8sLxDnsbcJfXMFWV9GUnn5wuluLsKuefnC6W4uwq1zRy8aXJQNRFtlTWFLGjZSJVpJZWUgkos7UAoq4HOfc&_nc_ohc=SyWZ9JZbsNwAX9kPp5p&_nc_ht=scontent-hkg4-1.xx&oh=00_AfBT5O_FJOgL-0xLojvNXRab_Vm5eULa28mDnHbIX1EjxQ&oe=656C47F7',
              width: 400,
              height: 300,
              cache: 'default',
            }}
            resizeMode="contain"
          />
          <Text style={styles.message}>
            Test HOME SCREEN
          </Text>
          {userData && (
            <View style={styles.userContainer}>
              <Text style={styles.userDetails}>Name: {userData.name}</Text>
              <Text style={styles.userDetails}>Email: {userData.email}</Text>
            </View>
          )}
        </View>
        <FAB
          placement="right"
          color="#f02e65"
          size="large"
          title="Logout"
          icon={{name: 'logout', color: '#FFFFFF'}}
          onPress={handleLogout}
        />
      </SafeAreaView>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default Home
