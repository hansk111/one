import apple from "@assets/images/img_apple.png";
import facebook from "@assets/images/img_facebook.png";
import google from "@assets/images/img_google.png";
import { Link } from "expo-router";
import * as React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const images = {
  google,
  apple,
  facebook,
};

export default function SignUp() {
  // const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {};

  // Handle submission of verification form
  const onVerifyPress = async () => {};

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="justify-center items-center mt-10">
        <Text className="text-3xl">Sign up</Text>
        <Text className="text-2xl mt-5">Create Account</Text>
      </View>

      <View className="flex flex-col justify-left items-left ml-5 mr-5 mt-5">
        <Text className="text-blue-500">Email address</Text>
        <TextInput
          className="border-2 text-xl text-gray-400 border-gray-300 rounded-md p-2 my-2"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter your email"
          onChangeText={(email) => setEmailAddress(email)}
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
      <TouchableOpacity
        className="bg-blue-500 justify-center items-center rounded-md p-2 my-5 ml-5 mr-5 mt-5"
        onPress={onSignUpPress}
      >
        <Text className="text-xl">Create an Account</Text>
      </TouchableOpacity>

      <View className="flex flex-row justify-center items-center">
        <Text>Already have an account?</Text>
        <Link href="/signin">
          <Text className="text-sm text-blue-500 underline"> Sign in</Text>
        </Link>
      </View>
      <View className="flex flex-row justify-center items-center mt-10">
        <Text className="mx-2">Or Sign Up with</Text>
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
