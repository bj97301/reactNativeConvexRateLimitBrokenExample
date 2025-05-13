import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { ConvexProvider, useQuery, useMutation } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { api } from "./convex/_generated/api";

// Initialize the Convex client
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

function Counter() {
  const count = useQuery(api.counter.get);
  const increment = useMutation(api.counter.increment);

  if (count === undefined) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter: {count}</Text>
      <Pressable style={styles.button} onPress={() => increment()}>
        <Text style={styles.buttonText}>Increment</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <Counter />
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
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
