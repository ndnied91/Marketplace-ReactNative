import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@clerk/clerk-expo';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const { isLoaded, signOut } = useAuth();

  const menuList = [
    {
      id: 1,
      name: 'My Posts',
      icon: <Entypo name="open-book" size={50} color="black" />,
      path: 'my-posts',
    },
    {
      id: 2,
      name: 'Explore',
      icon: <Feather name="search" size={50} color="black" />,
      path: 'explore',
    },
    {
      id: 3,
      name: 'Logout',
      icon: <SimpleLineIcons name="logout" size={50} color="black" />,
      path: 'logout',
    },
  ];

  const onMenuPress = (item) => {
    if (item.path === 'logout') {
      signOut();
      return;
    }

    item.path ? navigation.navigate(item.path) : null;
  };

  return (
    <SafeAreaView className="mt-10">
      <View className="justify-center items-center">
        <Image
          source={{ uri: user.imageUrl }}
          className="h-32 w-32 rounded-full"
        />

        <Text className="font-bold text-md mt-4">
          {user.primaryEmailAddress.emailAddress}
        </Text>
        <Text className="text-sm mt-1 text-gray-600"> {user.fullName} </Text>
      </View>

      <View className="items-center mt-4">
        <FlatList
          scrollEnabled={false}
          horizontal
          className=""
          data={menuList}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 m-2 border rounded-md bg-gray-200"
              onPress={() => onMenuPress(item)}
            >
              <View className="items-center ">
                <View className="h-16 w-16 items-center">{item.icon}</View>

                <Text className="text-center"> {item.name} </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
