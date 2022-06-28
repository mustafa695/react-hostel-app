import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import images from '../constant/images';
import {colors} from '../constant/colors';
import fonts from '../constant/fonts';

const SplashScreen = () => {
  return (
    <LinearGradient colors={['#000D3D', '#FFFFFF']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.content}>
        <Image
          source={images.mainLogo}
          resizeMode="contain"
          style={styles.logo}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: '100%',
    height: '35%',
  },
  btn: {
    backgroundColor: colors.darkBlue,
    width: '53%',
    borderRadius: 20,
    // height:48
  },
  btnTxt: {
    color: colors.white,
    textAlign: 'center',
    paddingVertical: 8.5,
    fontSize: 22,
    fontFamily: fonts.medium,
  },
});

export default SplashScreen;
