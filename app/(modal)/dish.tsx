import { View, Text, StyleSheet, Image, Animated } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDishById } from "@/assets/data/restaurant";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeInLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import useBasketStore from "@/store/basketStore";

const Dish = () => {
  const { id } = useLocalSearchParams();
  const item = getDishById(+id)!;
  const router = useRouter();
  const { addProduct } = useBasketStore();

  const addToCart = () => {
    addProduct(item);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      //   edges={["bottom"]}
    >
      <View style={styles.container}>
        <Animated.Image
          // @ts-ignore
          entering={FadeInLeft.duration(400).delay(200)}
          source={item?.img}
          style={styles.image}
        />
        <View style={{ padding: 20 }}>
          <Animated.Text
            // @ts-ignore
            entering={FadeInLeft.duration(400).delay(200)}
            style={styles.dishName}
          >
            {item?.name}
          </Animated.Text>
          <Animated.Text
            // @ts-ignore
            entering={FadeInLeft.duration(400).delay(400)}
            style={styles.dishInfo}
          >
            {item?.info}
          </Animated.Text>
        </View>
        <View style={styles.footer}>
          <View>
            <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
              <Text style={styles.footerText}>Add for ₹{item?.price} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dishInfo: {
    fontSize: 16,
    color: Colors.mediumDark,
  },
  footer: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Dish;
