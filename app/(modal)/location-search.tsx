import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

// process.env.EXPO_PUBLIC_GOOGLE_API_KEY

const LocationSearch = () => {
  const navigation = useNavigation();
  const zoomLevel = 12;
  const latitudeDelta = 360 / Math.pow(2, zoomLevel);
  const [location, setLocation] = useState({
    latitude: 28.613109765624834,
    longitude: 77.22956334080415,
    latitudeDelta: latitudeDelta,
    longitudeDelta: latitudeDelta,
  });

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        query={{
          key: "AIzaSyAsagCBV2RxEV66mQK3sPU9_xZCo7Ji7TQ",
          language: "en",
        }}
        enableHighAccuracyLocation={true}
        placeholder="Search or move the map"
        fetchDetails={true}
        onPress={(data, details) => {
          const point = details?.geometry?.location;

          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.medium} />
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: "#fff",
          },
        }}
      />

      <MapView style={styles.map} showsUserLocation={true} region={location} />
      <View style={styles.absouluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absouluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  boxIcon: {
    position: "absolute",
    left: 15,
    top: 18,
    zIndex: 1,
  },
});

export default LocationSearch;
