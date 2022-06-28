import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

const Autocomplete = ({data, onChangeHandler}) => {
  const [queryText, setQueryText] = useState('');
  return (
    <>
      <TextInput
        placeholder="Search...."
        style={styles.textSearch}
        onChangeText={text => {
          onChangeHandler(text);
          setQueryText(text);
        }}
      />
      {queryText?.length ? (
        <FlatList
          style={styles.searchWrapp}
          data={data}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => alert('----------')}
              style={{zIndex: 1000}}>
              <Text
                style={[
                  styles.searchItem,
                  {marginBottom: index === data?.length - 1 ? 0 : 0},
                ]}>
                {item?.value}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  searchWrapp: {
    height: 'auto',
    maxHeight: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    zIndex: 50,
    position: 'absolute',
    top: 110,
    width: '100%',
    alignSelf: 'center',
  },
  textSearch: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 40,
    borderColor: '#fff',
    paddingHorizontal: 15,
    position: 'relative',
  },
  searchItem: {
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});

export default Autocomplete;
