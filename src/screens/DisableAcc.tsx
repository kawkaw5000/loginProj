// DisableAccountScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Pressable } from 'react-native';
import { AuthStackParamList } from '../route/AuthStack';
import AppwriteContext from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';


type DeleteAccScreenNavigationProp = NativeStackScreenProps<AuthStackParamList, "DisableAcc">



const DisableAccountScreen = ({navigation}: DeleteAccScreenNavigationProp) => {
    const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const handleDisableAccount = () => {
        appwrite
            .deleteAccount()
            .then((response:any) => {
              Snackbar.show({
                text: 'Delete Success',
                duration: Snackbar.LENGTH_SHORT,
              });
                navigation.navigate('Login');
            })
    }
  // Function to handle disabling the account

  return (
    <View style={styles.container}>

      {/* Disable Account button */}
      <Button title="Disable Account" onPress={handleDisableAccount} color="#FF0000" />

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
      },
      formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      appName: {
        color: '#f02e65',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        backgroundColor: '#fef8fa',
        padding: 15,
        height: 50,
        borderRadius: 8,
        width: '100%',
        color: '#000000',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 1,
      },
      errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 15,
      },
      btn: {
        backgroundColor: '#ffffff',
        padding: 15,
        height: 50,
        borderRadius: 8,
        width: '100%',
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
      btnText: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
      },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default DisableAccountScreen;
