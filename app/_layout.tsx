import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#F94141" translucent={false} />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F94141",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
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
