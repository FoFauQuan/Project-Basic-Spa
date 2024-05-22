 import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { MyContextControllerProvider } from './src/index';
import Router from './routers/Router';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  return (
    <MyContextControllerProvider>
      <MenuProvider>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </MenuProvider>
    </MyContextControllerProvider>
  );
}
export default App

