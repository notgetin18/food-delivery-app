import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Categories from "@/Components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Resturants from "@/Components/Resturants";
import Colors from "@/constants/Colors";

const page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingBottom: 40 }}>
        <Categories />
        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <Resturants />
        <Text style={styles.header}>Offers near you</Text>
        <Resturants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 70,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});

export default page;
