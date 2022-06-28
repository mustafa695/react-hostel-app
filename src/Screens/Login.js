import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useToast} from 'react-native-toast-notifications';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import images from '../constant/images';
import fonts from '../constant/fonts';
import {colors} from '../constant/colors';

GoogleSignin.configure({
  // scopes: ["email"],
  webClientId:
    '585769449145-vp449cohd3c8ste7j44kdaabj3oupatd.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const toast = useToast();

  const signInWithEmailorPassword = () => {
    if (!email || !password) return;
    setLoader(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toast.show('User signed in successfully!');
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        toast.show(error.toString().split(']')[1]);
        console.log(error);
      });
  };

  const googleSigin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error, 'error from google');
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={['#ffffff29', '#ffffff26']}
          style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={styles.logoWrapp}>
            <View style={styles.circle1}>
              <Image
                source={images.circle1}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <Image
              source={images.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.intro}>
            <Text style={styles.textW}>Welcome,</Text>
            <Text style={styles.textP}>Let’s explore your next trip!</Text>
          </View>
          <View style={styles.inputWrapp}>
            <TextInput
              placeholder="Phone, email or username"
              style={styles.input}
              onChangeText={newText => setEmail(newText)}
              defaultValue={email}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={newText => setPassword(newText)}
              defaultValue={password}
            />
          </View>

          <Text style={styles.lwa}>Login with account</Text>

          <View style={styles.iconWrapper}>
            <TouchableOpacity style={[styles.soailIcon, {marginRight: 30}]}>
              <Feather name="facebook" size={24} color="#000D3D" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.soailIcon} onPress={googleSigin}>
              <FontAwesome name="google-plus" size={24} color="#000D3D" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={loader ? true : false}
            style={[styles.btnSigin, styles.btnShadow]}
            onPress={!loader ? signInWithEmailorPassword : undefined}>
            {loader ? (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={styles.btnTxt}
              />
            ) : (
              <Text style={styles.btnTxt}>Sign in</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Text
              style={{
                color: colors.black,
                fontSize: 14,
                fontFamily: fonts.medium,
              }}>
              Don’t have any account? Register
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  logoWrapp: {
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: '100%',
  },
  circle1: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: '65%',
    height: 300,
  },
  intro: {
    paddingLeft: 42,
  },
  textW: {
    fontFamily: fonts.regular,
    fontSize: Dimensions.get('window').width * 0.062,
  },
  textP: {
    fontFamily: fonts.seaweed,
    fontSize: Dimensions.get('window').width * 0.062,
  },
  inputWrapp: {
    paddingHorizontal: 45,
    marginTop: 29,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.black,
    height: Dimensions.get('window').height * 0.07,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginBottom: 13,
  },
  lwa: {
    paddingHorizontal: 42,
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.medium,
    marginTop: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  soailIcon: {
    borderWidth: 1,
    borderColor: colors.black,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnSigin: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 15,
  },
  btnTxt: {
    color: colors.white,
    backgroundColor: colors.darkBlue,
    width: 160,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    fontFamily: fonts.medium,
    fontSize: 16,
    zIndex: 20,
  },
  btnShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default Login;
