import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "./convex/_generated/api";

// Initialize the Convex client
const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL ??
    "https://giddy-chickadee-349.convex.cloud"
);

export default function App() {
  const testRateLimit = useMutation(api.counter.increment);

  const handleTestRateLimit = async () => {
    try {
      const result = await testRateLimit();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ConvexProvider client={convex}>
      <View style={styles.container}>
        <Text style={styles.title}>Convex Counter Test</Text>
        <Button title="Increment Counter" onPress={handleTestRateLimit} />
        <StatusBar style="auto" />
      </View>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
