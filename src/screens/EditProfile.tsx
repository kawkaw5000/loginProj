import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthStackParamList } from '../route/AuthStack';
import Snackbar from 'react-native-snackbar';
import {AppwriteContext} from '../appwrite/AppwriteContext'


type EditProfileScreenNavigationProp = NativeStackScreenProps<AuthStackParamList, "EditProfile">


const EditProfileScreen = ({navigation}: EditProfileScreenNavigationProp) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const handleSave = () => {
    if (
      email.length < 1 ||
      password.length < 1 
      ) {
        setError('All fields are required');
      } else {
        const user = {
          email,
          password,
        };
        appwrite
        .updateAccUser(user)
        .then((response:any) => {
          Snackbar.show({
            text: 'Update Success',
            duration: Snackbar.LENGTH_SHORT,
          });
            navigation.navigate('Settings');
        })
        .catch(e => {
          console.log(e);
          setError(e.message)
          
        })
    
  }
}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.appName}>EDIT EMAIL</Text>

        {/* Username */}
  
        {/* Email */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />
        <Text style={styles.appName}> </Text>
        <Text style={styles.appName}>Confirm</Text>
        {/* Password */}
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password Validation"
          style={styles.input}
          secureTextEntry
        />
 
        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Save button */}
        <Pressable
          onPress={handleSave}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
});

export default EditProfileScreen;
