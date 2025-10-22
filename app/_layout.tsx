import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const router = useRouter();

  const back = () => {
    router.back();
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#487d76" translucent={false} />

      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
