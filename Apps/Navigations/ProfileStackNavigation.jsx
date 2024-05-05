import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProducts from '../screens/MyProducts';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ExploreScreen from '../screens/ExploreScreen';
import { AntDesign } from '@expo/vector-icons';
import ProductDetail from '../screens/ProductDetail';

const Stack = createStackNavigator();

const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-screen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="my-posts"
        component={MyProducts}
        options={{
          headerTitleStyle: {
            display: 'none',
          },
          headerBackImage: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
          ),
          headerBackTitle: 'Back',
          headerBackTitleStyle: {
            color: 'black',
          },
        }}
      />
      <Stack.Screen
        name="explore"
        component={ExploreScreen}
        options={{
          headerBackImage: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
          ),
          headerBackTitle: 'Back',
          headerBackTitleStyle: {
            color: 'black',
          },
        }}
      />

      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={({ route }) => ({
          title: route.params?.item?.title,
          headerTitleStyle: {
            textTransform: 'capitalize',
          },
          headerBackImage: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
          ),
          headerBackTitle: 'Back',
          headerBackTitleStyle: {
            color: 'black',
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigation;
