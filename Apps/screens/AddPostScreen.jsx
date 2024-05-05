import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';

import { app } from '../../firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

const AddPostScreen = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);

  const db = getFirestore(app);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    getCategoriesList();
  }, []);

  const getCategoriesList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value, resetForm) => {
    setLoading(true);
    const response = await fetch(image);
    const blob = await response.blob(); //convert into blob

    const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg'); //saved to specific folder

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log('Uploaded a blog of file');
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          value.image = downloadUrl;
          value.userName = user.fullName;
          value.userEmail = user.primaryEmailAddress.emailAddress;
          value.userImage = user.imageUrl;

          const docRef = await addDoc(collection(db, 'UserPost'), value); //https://firebase.google.com/docs/firestore/manage-data/add-data
          if (docRef.id) {
            console.log('document added');
            setLoading(false);
            resetForm();
            setImage(null);
            Alert.alert('Success!', 'Post added successfully');
          }
        });
      });
  };

  return (
    <SafeAreaView className="m-10 flex-1">
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="mt-6 font-bold text-xl "> Add new post </Text>
          <Text className="font-normal text-md mt-4 mb-2 text-gray-700">
            {' '}
            Create new post and start selling{' '}
          </Text>
          <Formik
            initialValues={{
              title: '',
              desc: '',
              category: '',
              address: '',
              image: '',
              userName: '',
              userEmail: '',
              userImage: '',
              createdAt: Date.now(),
            }}
            onSubmit={(value, { resetForm }) =>
              onSubmitMethod(value, resetForm)
            }
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.name = 'Title must be present';
                // Alert.alert('Missing Field', 'Title must be present', [
                //   { text: 'OK', onPress: () => console.log('OK Pressed') },
                // ]);
              }
              return errors;
            }}
          >
            {({
              handleChange,
              handleBlue,
              handleSubmit,
              values,
              errors,
              resetForm,
            }) => (
              <View>
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      height={100}
                      width={100}
                      borderRadius={15}
                    />
                  ) : (
                    <Image
                      source={require('./../../assets/images/placeholder.jpeg')}
                      style={{ width: 100, height: 100, borderRadius: 15 }}
                    />
                  )}
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={values?.title}
                  onChangeText={handleChange('title')}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={values?.desc}
                  onChangeText={handleChange('desc')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  value={values?.price}
                  keyboardType="numeric"
                  onChangeText={handleChange('price')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={values?.address}
                  onChangeText={handleChange('address')}
                />

                {/* Category List dropdown */}
                <View className="">
                  <Picker
                    selectedValue={values?.category}
                    onValueChange={handleChange('category')}
                  >
                    {categoryList &&
                      categoryList.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.name.toUpperCase()}
                          value={item.name}
                        />
                      ))}
                  </Picker>
                </View>

                <TouchableOpacity
                  disabled={loading}
                  className={` ${
                    loading ? 'opacity-50' : 'opacity-100'
                  } p-4 bg-blue-500 rounded-full`}
                  onPress={handleSubmit}
                >
                  {loading ? (
                    <ActivityIndicator color={'#fff'} />
                  ) : (
                    <Text className="text-white text-center text-lg font-bold">
                      {' '}
                      Submit{' '}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
  },
});
