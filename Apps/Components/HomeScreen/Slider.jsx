import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';

const Slider = ({ sliderList }) => {
  return (
    <View>
      <FlatList
        horizontal
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.image }}
              className="h-48 w-96 mr-5 rounded-md mt-10"
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;
