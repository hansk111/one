import { Checkbox } from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import apple from "@assets/images/img_apple.png";
import facebook from "@assets/images/img_facebook.png";
import google from "@assets/images/img_google.png";

import { useLoginMutation } from "@/store/auth/authApiSlice";
import { setAuth } from "@/store/auth/authSlice";
import { saveAccessToken, saveRefreshToken } from "@/store/auth/tokenManager";
import { useDispatch } from "@/store/hooks";

export const images = {
  google,
  apple,
  facebook,
};

export default function SignIn() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    try {
      // 로딩 상태 시작
      const res = await login({ email, password }).unwrap();
      // 로딩 상태 종료
      console.log("platform====", Platform.OS);
      dispatch(setAuth());

      if (Platform.OS === "android") {
        await saveAccessToken(res.access);
        await saveRefreshToken(res.refresh);
      }

      router.push("/");
    } catch (error: any) {
      // 오류 타입 명시
      // 로딩 상태 종료
      console.error("로그인 실패:", error);
      // 사용자에게 오류 메시지 표시 (예: alert)
      alert(error.message || "로그인 실패 backend 확인");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="justify-center items-center mt-10">
        <Text className="text-3xl">Sign in</Text>
        <Text className="text-2xl mt-5">Hi! Welcome Back!!!</Text>
      </View>
      <View className="flex flex-col justify-left items-left ml-5 mr-5 mt-5">
        <Text className="text-blue-500">Email address</Text>
        <TextInput
          className="border-2 text-xl text-gray-400 border-gray-300 rounded-md p-2 my-2"
          autoCapitalize="none"
          value={email}
          placeholder="Enter your email"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View className="flex flex-col justify-left items-left ml-5 mr-5 mt-5">
        <Text className="text-blue-500">Password</Text>
        <TextInput
          className="border-2 text-xl text-gray-400 border-gray-300 rounded-md p-2 my-2"
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View className="flex flex-row items-center justify-between ml-5 mr-5 mt-5">
        <View className="flex flex-row justify-center items-center">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          ></Checkbox>
          <Text className=""> Remember Me</Text>
        </View>
        <Link className="text-blue-500" href="/">
          <Text className="text-sm text-blue-500 underline">
            Forgot password? UC
          </Text>
        </Link>
      </View>
      <TouchableOpacity
        className="bg-blue-500 justify-center items-center rounded-md p-2 my-5 ml-5 mr-5 mt-5"
        onPress={onSignInPress}
      >
        <Text className="text-xl">Sign In your Account</Text>
      </TouchableOpacity>
      <View className="flex flex-row justify-center items-center">
        <Text>Don&apos;t have an account?</Text>
        <Link className="text-blue-500" href="/signup">
          <Text className="text-sm text-blue-500 underline"> Sign up</Text>
        </Link>
      </View>
      <View className="flex flex-row justify-center items-center mt-5">
        <Text>Home</Text>
        <Link className="text-blue-500" href="/">
          <Text className="text-xl text-blue-500 underline"> Go to Home</Text>
        </Link>
      </View>
      <View className="flex flex-row justify-center items-center mt-10">
        <Text className="mx-2">Or Sign In with</Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-10 ml-10 mr-10">
        <TouchableOpacity>
          <Image source={images.google}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={images.facebook}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={images.apple}></Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
