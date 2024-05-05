import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Button,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { useUser } from '@clerk/clerk-expo';
import { doc, deleteDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

const ProductDetail = ({ navigation }) => {
  const { params } = useRoute();
  const [product, setProduct] = useState(null);
  const { user } = useUser();
  const db = getFirestore(app);

  const nav = useNavigation();

  useEffect(() => {
    params && setProduct(params.item);
    shareBtn();
  }, [params]);

  const shareBtn = () => {
    navigation.setOptions({
      headerRight: () => (
        <Feather
          name="share"
          onPress={() => shareProduct()}
          style={{ marginRight: 15 }}
          size={24}
          color="black"
          title="Update count"
        />
      ),
    });
  };

  const shareProduct = () => {
    const content = { message: product?.title + '\n' + product?.desc };
    Share.share(content).then((response) => {
      console.log(response);
    });
  };

  const sendEmailMessage = () => {
    const subject = `${product.title}`;
    const body = 'Hi there, I am interested in this item';
    Linking.openURL(
      `mailto:${product.userEmail}?subject=${subject}&body=${body}`
    );
  };

  const deleteUserPost = () => {
    Alert.alert('Do you want to delete this post?', '', [
      { text: 'Yes', onPress: () => deleteFromFirestore() },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const deleteFromFirestore = async () => {
    console.log('deleted');

    const q = query(
      collection(db, 'UserPost'),
      where('title', '==', product.title)
    );

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then(() => {
        console.log('Doc deleted');
        nav.goBack();
      });
    });
  };

  return (
    <ScrollView className="m-4">
      <View>
        <Image source={{ uri: product?.image }} className="h-48  rounded-sm" />
        <Text className="text-lg font-bold mt-1">{product?.title}</Text>
        <Text className="text-xs mb-4 capitalize">{product?.category} </Text>
        <Text className="text-md mt-1">{product?.desc} </Text>
      </View>

      <View className="p-3 flex-row items-center gap-2 mt-4">
        {/* contact info */}

        <Image
          source={{ uri: product?.userImage }}
          className="h-12 w-12 rounded-full"
        />
        <View>
          <Text className="font-bold">{product?.userName}</Text>
          <Text className="text-gray-500">{product?.userEmail}</Text>
        </View>
      </View>

      {user?.primaryEmailAddress?.emailAddress === product?.userEmail ? (
        <TouchableOpacity
          onPress={() => deleteUserPost()}
          className="h-12 justify-center bg-red-500 rounded-full"
        >
          <Text className="text-center text-white"> Delete post</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className="h-12 justify-center bg-gray-500 rounded-full"
        >
          <Text className="text-center text-white"> Send email</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default ProductDetail;
