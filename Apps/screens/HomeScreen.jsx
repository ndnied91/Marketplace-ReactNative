import { SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

import { app } from '../../firebaseConfig';
import Categories from '../Components/HomeScreen/Categories';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

const HomeScreen = () => {
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  const db = getFirestore(app);
  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, 'Sliders'));
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  const getCategoriesList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);

    const querySnapshot = await getDocs(
      query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'), limit(4))
    );

    querySnapshot.forEach((doc) => {
      setLatestItemList((userPost) => [...userPost, doc.data()]);
    });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getSliders();
    getCategoriesList();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getLatestItemList();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className="py-8 px-6 m-4 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Slider sliderList={sliderList} />

        <Categories categoryList={categoryList} />
        <LatestItemList
          latestItemList={latestItemList}
          heading={'Latest Items'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
