import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { forwardRef, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;
const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snaPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useMemo(() => {
    return (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);
  const { dismiss } = useBottomSheetModal();
  const navigation = useNavigation();

  return (
    <BottomSheetModal
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snaPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.toogle}>
          <TouchableOpacity style={styles.toogleActive}>
            <Text style={styles.activeText}>Delivery location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toogleInactive}>
            <Text style={styles.InactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeader}>Your location</Text>
        <Link href={"/(modal)/location-search"} asChild>
          <TouchableOpacity
            onPress={() => {
              // Close the BottomSheet when navigating
              dismiss();
            }}
          >
            <View style={styles.item}>
              <Ionicons
                name="location-outline"
                size={20}
                color={Colors.medium}
              />

              <Text style={{ flex: 1 }}>Current location</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </Link>
        <Text style={styles.subHeader}>Arrival time</Text>
        <Link href={"/"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons
                name="stopwatch-outline"
                size={20}
                color={Colors.medium}
              />

              <Text style={{ flex: 1 }}>Now</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  toogle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 32,
  },
  toogleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  toogleInactive: {
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  InactiveText: {
    color: Colors.primary,
    fontWeight: "500",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default BottomSheet;
