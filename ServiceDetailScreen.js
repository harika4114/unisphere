import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ServiceDetailScreen({ route }) {
  const navigation = useNavigation();
  const { service } = route.params;

  const employees = [
    {
      id: 1,
      name: "John Doe",
      rating: 4.8,
      address: "New York, NY",
      phone: "1234567890",
      image: require("./assets/caretaker2.jpg"), // Use require for local images
    },
    {
      id: 2,
      name: "Emma Smith",
      rating: 4.7,
      address: "Los Angeles, CA",
      phone: "9876543210",
      image: require("./assets/mechanic2.jpg"), // Use require for local images
    },
    {
      id: 3,
      name: "Michael Johnson",
      rating: 4.6,
      address: "Hyderabad",
      phone: "5556667777",
      image: require("./assets/electrician2.jpg"), // Use require for local images
    },
    {
      id: 4,
      name: "Sophia Brown",
      rating: 4.9,
      address: "Houston, TX",
      phone: "2223334444",
      image: require("./assets/maid3.jpg"), // Use require for local images
    },
    {
      id: 5,
      name: "William Davis",
      rating: 4.5,
      address: "Phoenix, AZ",
      phone: "6667778888",
      image: require("./assets/pest4.jpg"), // Use require for local images
    },
    {
      id: 6,
      name: "Olivia Wilson",
      rating: 4.7,
      address: "Philadelphia, PA",
      phone: "9990001111",
      image: require("./assets/painter3.jpg"), // Use require for local images
    },
  ];

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{service.name}</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.sectionTitle}>Available Professionals</Text>

        <View style={styles.gridContainer}>
          {employees.map((employee) => (
            <TouchableOpacity
              key={employee.id}
              style={styles.card}
              onPress={() => navigation.navigate("ProfileDetail", { employee })}
            >
              <View style={styles.profileContainer}>
                <Image source={employee.image} style={styles.profileImage} /> {/* Use employee.image directly */}
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.name}>{employee.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{employee.rating}</Text>
                  <Text style={styles.reviewCount}>(120 reviews)</Text>
                </View>
                <View style={styles.addressContainer}>
                  <Ionicons name="location" size={14} color="#666" />
                  <Text style={styles.address}>{employee.address}</Text>
                </View>

                {/* Chat & Call Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate("Chat", { service })}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={20} color="#A855F7" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iconButton} onPress={() => handleCall(employee.phone)}>
                    <Ionicons name="call-outline" size={20} color="#A855F7" />
                  </TouchableOpacity>
                </View>

                {/* Book Now Button */}
                <TouchableOpacity
  style={styles.bookNowButton}
  onPress={() => navigation.navigate("Tracking", { employee, service })}
>
  <Text style={styles.bookNowButtonText}>Book Now</Text>
</TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
  },
  header: {
    backgroundColor: "#A855F7",
    padding: 16,
    paddingTop: 44,
    paddingBottom: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 44,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  contentBox: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#A855F7",
    marginBottom: 20,
    marginLeft: 4,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  card: {
    width: "48%",
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A855F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "visible",
  },
  profileContainer: {
    width: 90,
    height: 90,
    borderRadius: 40,
    backgroundColor: "#A855F7",
    position: "absolute",
    top: -10,
    left: -10,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 35,
  },
  cardContent: {
    padding: 16,
    paddingTop: 80,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  rating: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: "#666",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  address: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  bookNowButton: {
    backgroundColor: "#A855F7",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  bookNowButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});