import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Categories = ({ categoryList }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text className="font-bold text-xl pt-6">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="flex-1 items-center justify-center"
            onPress={() =>
              navigation.navigate('item-list', { category: item.name })
            }
          >
            <Image
              source={{ uri: item?.image }}
              className="h-12 w-12 mr-5 rounded-md p-10 m-2 "
            />
            <Text className="text-sm capitalize"> {item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
