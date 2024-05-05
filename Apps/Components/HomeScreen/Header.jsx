import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';

const Header = () => {
  const { user } = useUser();
  return (
    <View>
      {/* User info */}
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="h-12 w-12 rounded-full"
        />

        <View>
          <Text className="font-bold">Welcome </Text>
          <Text className="text-semibold">{user?.fullName}</Text>
        </View>
      </View>
      {/* Search bar */}
      <View className="p-4 rounded-full bg-white mt-6 flex-row items-center border">
        <Feather name="search" size={24} color="black" />
        <TextInput
          placeholder="Search"
          className="pl-1"
          onChangeText={(value) => console.log(value)}
        />
      </View>
    </View>
  );
};

export default Header;
