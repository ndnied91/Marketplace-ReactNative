import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import PostItem from './PostItem';

const LatestItemList = ({ latestItemList, heading }) => {
  return (
    <View className="mt-3 mb-10">
      {heading?.length > 0 ? (
        <Text className="font-bold text-xl pt-6">{heading}</Text>
      ) : null}

      <FlatList
        data={latestItemList}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <PostItem item={item} />}
      />
    </View>
  );
};

export default LatestItemList;
