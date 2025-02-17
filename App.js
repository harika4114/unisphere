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
import EmployeeDashboard from "./EmployeeDashboard"; // ✅ Ensure the correct path

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const employeeData = await AsyncStorage.getItem("loggedInEmployee");

        if (employeeData) {
          setUserType("employee");
        } else if (userToken) {
          setUserType("customer");
        } else {
          setUserType(null);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // ✅ Show loading screen before navigation loads
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
  initialRouteName="StartScreen"  // ✅ Always start from StartScreen
  screenOptions={{ headerShown: false }}
>
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

