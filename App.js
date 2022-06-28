import React from 'react';
import SplashScreen from './src/Screens/SplashScreen';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import {ToastProvider} from 'react-native-toast-notifications';
import Home from './src/Screens/Home';

const App = () => {
  return (
    <ToastProvider duration={3500} offsetBottom={30}>
      {/* <SplashScreen /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <Home />
    </ToastProvider>
  );
};

export default App;
