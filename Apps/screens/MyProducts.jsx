import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { useNavigation } from '@react-navigation/native';

const MyProducts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const db = getFirestore(app);
  const navigation = useNavigation();

  const getUserPosts = async (email) => {
    const postsRef = collection(db, 'UserPost');
    const q = query(postsRef, where('userEmail', '==', email));

    const querySnapshot = await getDocs(q);
    setPosts(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      console.log(e);
      getUserPosts(user.primaryEmailAddress.emailAddress);
    });
  }, [navigation]);

  useEffect(() => {
    getUserPosts(user.primaryEmailAddress.emailAddress);
  }, []);

  return (
    <SafeAreaView>
      <Text className="text-center font-bold text-xl mt-4">My Posts</Text>
      <LatestItemList latestItemList={posts} />
    </SafeAreaView>
  );
};

export default MyProducts;
