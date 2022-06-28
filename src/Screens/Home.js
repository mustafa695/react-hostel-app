import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constant/colors';
import images from '../constant/images';
import fonts from '../constant/fonts';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const banners = [
    {id: 1, name: '333sssssssssssssssssssssssssss'},
    {id: 2, name: '333sssssssssssssssssf'},
    {id: 4, name: '33fffffffffffff3'},
    {id: 5, name: '33fffffffffffffffffffff3'},
  ];

  const RenderBanners = item => {
    return (
      <View>
        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            borderRadius: 20,
            width: '100%',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#000C35', '#C4C4C4']}
            style={styles.bannerWrap}>
            <Text style={styles.banTxt}>
              Exciting couple tour for next vacation
            </Text>
            <View style={styles.banInnerRow}>
              <Text style={styles.banOffer}>25% OFF</Text>
              <TouchableOpacity style={styles.btnBook}>
                <Text style={styles.btnTExt}>Book now!</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="md-arrow-back" size={17} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.header}>
        <View>
          <Text style={styles.hi}>Hi, Alvia!</Text>
          <Text style={styles.slog}>Where are you thinking of going?</Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Image
            source={images.avatar}
            resizeMode="cover"
            style={{width: '100%', height: '100%', borderRadius: 55}}
          />
        </TouchableOpacity>
      </View>
      {/* book now slider */}

      <View>
        <FlatList
          horizontal={true}
          data={banners}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <RenderBanners item={item} index={index} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight - 20,
    paddingHorizontal: '4%',
  },
  backButton: {
    backgroundColor: colors.primaryBg,
    width: 28,
    height: 28,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: colors.primaryBg,
  },
  hi: {
    fontFamily: fonts.medium,
    fontSize: 26,
    color: colors.black,
  },
  slog: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black,
    marginTop: 4,
  },

  bannerWrap: {
    // width: '80%',
    height: 154,
    padding: 18,
    borderRadius: 20,
    marginTop: 28,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 6,
    marginRight: 10,
  },
  banInnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banTxt: {
    color: colors.white,
    fontSize: 22,
    fontFamily: fonts.medium,
    width: Dimensions.get('window').width * 0.73,
  },
  banOffer: {
    fontFamily: fonts.medium,
    fontSize: 30,
    color: colors.white,
    marginTop: 10,
  },
  btnBook: {
    backgroundColor: colors.white,
    borderRadius: 55,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  btnTExt: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black,
  },
});

export default Home;
