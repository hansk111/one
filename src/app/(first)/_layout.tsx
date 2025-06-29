import { useSelector } from "@/store/hooks";
import { Stack } from "expo-router";

export default function FirstLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("Auth===", isAuthenticated);
  // const isAuthenticated = false;
  return (
    <>
      <Stack>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="signin" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="(mp3player)" options={{ headerShown: false }} />
          <Stack.Screen name="(bus)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
