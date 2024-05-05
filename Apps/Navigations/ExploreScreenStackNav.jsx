import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import ProductDetail from '../screens/ProductDetail';

import { AntDesign } from '@expo/vector-icons';

const Stack = createStackNavigator();

const ExploreScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="explore-tab"
        component={ExploreScreen}
        options={{
          headerTitleStyle: {
            display: 'none',
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

export default ExploreScreenStackNav;
