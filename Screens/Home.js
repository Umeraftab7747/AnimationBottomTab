import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.Container}>
      <Text>Umer Aftab</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
