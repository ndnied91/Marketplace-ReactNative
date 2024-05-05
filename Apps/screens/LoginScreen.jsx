import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View>
      <Image
        source={require('./../../assets/images/login.jpeg')}
        className="h-[400px] w-full object-scale-down "
      />

      <View className="p-8 mt-[-20px] bg-white rounded-t-3xl">
        <Text className="text-[25px] font-bold">Community Marketplace</Text>
        <Text className="text-[18px] text-slate-500 mt-4 mb-10">
          Buy Sell Marketplace where you can sell any item you want
        </Text>

        <TouchableOpacity
          className="p-3 bg-blue-500 rounded-full mt-30"
          onPress={() => onPress()}
        >
          <Text className="text-white text-center text-md">Get started </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
