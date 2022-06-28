import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';


const Tabs = () => {
  const tab = [
    {id: 1, name: 'Home'},
    {id: 2, name: 'Pizza'},
    {id: 3, name: 'Jelly'},
    {id: 4, name: 'Bananna'},
    {id: 5, name: 'Apple'},
    {id: 6, name: 'Mango'},
  ];

  const scroll = useRef(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    scroll.current.scrollToIndex({index, animated: true});
  }, [index]);

  return (
    <View style={{flex: 1, marginLeft: 20, marginTop: 20}}>
      <FlatList
        ref={scroll}
        data={tab}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={index}
        renderItem={({item, index}) => (
          <TouchableOpacity key={item.id} onPress={() => setIndex(index)}>
            <Text
              style={{
                fontSize: 20,
                marginRight: 10,
                backgroundColor: 'purple',
                color: '#fff',
                borderRadius: 55,
                paddingHorizontal: 15,
                paddingVertical: 4,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Tabs;
