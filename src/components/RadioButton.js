import {View, Text, Pressable} from 'react-native';
import React from 'react';
import fonts from '../constant/fonts';

const RadioButton = ({data, onSelect, horizontal, rowSpace}) => {
  //   const [itemSelect, setitemSelect] = React.useState('');
  const [itemInd, setitemInd] = React.useState(null);

  const handleSelected = (ind, value) => {
    setitemInd(ind);
    onSelect(value);
  };

  return (
    <View style={{flexDirection: horizontal ? 'row' : 'column'}}>
      {data?.map((item, ind) => {
        return (
          <Pressable key={ind} onPress={() => handleSelected(ind, item?.value)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: rowSpace ? rowSpace : 20,
              }}>
              <View
                style={{
                  position: 'relative',
                  width: 15,
                  height: 15,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 55,
                  marginRight: 8,
                  padding: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {itemInd === ind && (
                  <View
                    style={{
                      width: '90%',
                      height: '90%',
                      backgroundColor: '#000D3D',
                      borderRadius: 55,
                    }}></View>
                )}
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.medium,
                  color: '#000',
                }}>
                {item?.value}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RadioButton;
