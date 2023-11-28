import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import SignUpScreen from './src/SignUpScreen';
// import LoginScreen from './src/LoginScreen';
// import HomeScreen from './src/HomeScreen';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import {AuthStackParamList} from './route/AuthStack';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;