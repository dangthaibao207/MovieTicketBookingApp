import React, { useState, useEffect } from 'react';
import { firebase } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './Components/BottomTabs';
import Login from './Components/Login';
import Signup from './Components/Signup';
import MovieDetails from './Components/MovieDetails';
import DateTime from './Components/DateTime';
import SeatsPick from './Components/SeatsPick';
import Payment from './Components/Payment';

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Kiem soat su thay doi cua user
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    // if(false){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ headerShown: false }}/>
        <Stack.Screen name="DateTime" component={DateTime} options={{ headerShown: false }}/>
        <Stack.Screen name="SeatsPick" component={SeatsPick} options={{ headerShown: false }}/>
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <App />
  )
}
