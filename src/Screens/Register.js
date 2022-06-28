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
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useToast} from 'react-native-toast-notifications';
import LinearGradient from 'react-native-linear-gradient';
import images from '../constant/images';
import fonts from '../constant/fonts';
import {colors} from '../constant/colors';
import RadioButton from '../components/RadioButton';

const Register = () => {
  const data = [{value: 'Male'}, {value: 'Female'}];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');
  const [fullname, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [loader, setLoader] = useState(false);
  const toast = useToast();
  const signInWithEmailorPassword = () => {
    if (!username) {
      toast.show('Username cannot be emapty');
    } else if (!fullname) {
      toast.show('Name cannot be emapty');
    } else if (!gender) {
      toast.show('Gender cannot be empty');
    } else {
      setLoader(true);
      const date = new Date();
      let dateIso = date.toISOString();
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          let inputValues = {
            email,
            password,
            username,
            createdAt: dateIso,
            gender,
            avatar:
              'https://firebasestorage.googleapis.com/v0/b/hostel-a992d.appspot.com/o/avatar.png?alt=media&token=ab104258-d9f9-495f-8dad-8b385559da76',
          };
          firestore()
            .collection('users')
            .add(inputValues)
            .then(res => {
              toast.show('Register Succcessfully');
              setLoader(false);
              setusername('');
              setFullName('');
              setEmail('');
              setPassword('');
            })
            .catch(err => {
              setLoader(false);
              toast.show(err);
            });
        })
        .catch(error => {
          toast.show(error.toString().split(']')[1]);
          setLoader(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <ScrollView>
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
                placeholder="Username"
                style={styles.input}
                onChangeText={newText => setusername(newText)}
                defaultValue={username}
              />
              <TextInput
                placeholder="Full Name"
                style={styles.input}
                onChangeText={newText => setFullName(newText)}
                defaultValue={fullname}
              />
              <TextInput
                placeholder="Email"
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
              <View>
                <Text style={styles.genderTxt}>Gender</Text>
                <RadioButton
                  data={data}
                  horizontal={true}
                  onSelect={value => setGender(value)}
                />
              </View>
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
                <Text style={styles.btnTxt}>Register</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', paddingBottom: 30}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 14,
                  fontFamily: fonts.medium,
                }}>
                Don’t have any account? Login
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </ScrollView>
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
    marginTop: -30,
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
    marginTop: 20,
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
    marginTop: 25,
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
  genderTxt: {
    fontFamily: fonts.regular,
    fontSize: 17,
    marginBottom: 10,
    color: colors.black,
  },
});

export default Register;
