// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCSiMwBxp_v2ulmgZZDxZACmkWx2lS6AS0',
  authDomain: 'community-marketplace-yt.firebaseapp.com',
  projectId: 'community-marketplace-yt',
  storageBucket: 'community-marketplace-yt.appspot.com',
  messagingSenderId: '966367278689',
  appId: '1:966367278689:web:d7dbf3bc64f6d19aa31c20',
  measurementId: 'G-BBRNGKWT6D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
