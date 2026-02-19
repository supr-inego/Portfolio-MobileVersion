import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0f1115" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "800" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Personal Information",
        }}
      />
    </Stack>
  );
}
