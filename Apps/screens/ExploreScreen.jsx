import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { useRoute } from '@react-navigation/native';

const ExploreScreen = () => {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);

  const getAllProduct = async () => {
    const querySnapshot = await getDocs(
      collection(db, 'UserPost'),
      orderBy('createdAt', 'desc')
    );

    querySnapshot.forEach((doc) => {
      setProductList((userPost) => [...userPost, doc.data()]);
    });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <ScrollView className="mt-2">
      <Text className="font-bold text-xl text-center">Explore</Text>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  );
};

export default ExploreScreen;
