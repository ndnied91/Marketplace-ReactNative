import { View, Text } from 'react-native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ItemList from '../screens/ItemList';
import ProductDetail from '../screens/ProductDetail';

const Stack = createStackNavigator();

const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerTitleStyle: {
            textTransform: 'capitalize',
          },
          headerStyle: {
            backgroundColor: 'lightgray',
          },
        })}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          headerTitleStyle: {
            display: 'none',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStackNav;
