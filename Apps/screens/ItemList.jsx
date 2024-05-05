import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

const ItemList = () => {
  const { params } = useRoute();
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore(app);
  const getItemListbyCat = async () => {
    const q = query(
      collection(db, 'UserPost'),
      where('category', '==', params.category)
    );

    setItemList([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setItemList((itemList) => [...itemList, doc.data()]);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getItemListbyCat();
  }, [params]);

  return (
    <SafeAreaView>
      {isLoading ? (
        <View className="flex-column h-full justify-center self-center ">
          <Text className="text-gray-500 text-xl ">
            {' '}
            <ActivityIndicator size={'large'} color={'black'} />{' '}
          </Text>
        </View>
      ) : (
        <View>
          {itemList?.length > 0 ? (
            <LatestItemList latestItemList={itemList} heading={''} />
          ) : (
            <Text className="p-5 text-md mt-24 justify-center text-center">
              {' '}
              No items available at this time{' '}
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ItemList;
