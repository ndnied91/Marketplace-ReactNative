import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PostItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-1 m-1 bg-gray-200 rounded-lg shadow p-1"
      onPress={() => navigation.push('product-detail', { item })}
    >
      <Image source={{ uri: item?.image }} className="h-40 w-full rounded-md" />

      <Text className="text-sm font-bold  capitalize mt-2"> {item.title}</Text>
      <Text className="text-xs capitalize text-gray-600"> ${item.price}</Text>
      <Text className="capitalize mt-2"> {item.category}</Text>
    </TouchableOpacity>
  );
};

export default PostItem;
