import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// local imports
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import ManageExpense from "./screens/ManageExpense";
import { GlobalStyles } from "./constants/style";
import IconButton from "./components/UI/IconButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            iconName="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("Manage Expense")}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Recent Expenses"
        component={RecentExpenses}
        options={{
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Manage Expense"
            component={ManageExpense}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
