import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import "react-native-gesture-handler";

// Import screens
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import ServiceDetailScreen from "./ServiceDetailScreen";
import TrackingScreen from "./TrackingScreen";
import ChatScreen from "./ChatScreen";
import StartScreen from "./StartScreen";
import EmployeeLoginScreen from "./EmployeeLoginScreen";
import EmployeeSignupScreen from "./EmployeeSignupScreen";
import BookingScreen from "./BookingScreen";
import ProfileScreen from "./ProfileScreen";
import EmployeeDashboard from "./EmployeeDashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("StartScreen"); // Default to StartScreen

  // Check login status on app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");

        if (userToken) {
          setInitialRoute("Home"); // Redirect logged-in users to Home
        } else {
          setInitialRoute("StartScreen"); // Redirect non-logged-in users to StartScreen
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setInitialRoute("StartScreen"); // Redirect to StartScreen after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute} // Set initial route dynamically
        screenOptions={{ headerShown: false }}
      >
        {/* Screens */}
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Tracking" component={TrackingScreen} />
        <Stack.Screen name="MyBookings" component={BookingScreen} />
        <Stack.Screen name="MyProfile" component={ProfileScreen} />
        <Stack.Screen name="EmployeeLogin" component={EmployeeLoginScreen} />
        <Stack.Screen name="EmployeeSignup" component={EmployeeSignupScreen} />
        <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
