import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CreateList from "./pages/CreateList";
import ListItems from "./pages/ListItems";
import EditItems from "./pages/EditItems";
import HistoryList from "./pages/HistoryList";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function Routes() {
  function ListStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CreateList"
          component={CreateList}
          options={{ headerTitle: "Criação de lista" }}
        />
        <Stack.Screen
          name="AddItems"
          component={ListItems}
          options={{
            headerBackTitleVisible: false,
            headerTitle: "Produtos da lista"
          }}
        />
        <Stack.Screen
          name="EditItems"
          component={EditItems}
          options={{
            headerBackTitleVisible: false,
            headerTitle: "Editar Item"
          }}
        />
      </Stack.Navigator>
    );
  }

  function HistoryStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="HistoryList"
          component={HistoryList}
          options={{ headerTitle: "Minhas listas" }}
        />
        <Stack.Screen
          name="AddItems"
          component={ListItems}
          options={{
            headerBackTitleVisible: false,
            headerTitle: "Produtos da lista"
          }}
        />
        <Stack.Screen
          name="EditItems"
          component={EditItems}
          options={{
            headerBackTitleVisible: false,
            headerTitle: "Editar Item"
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Histórico"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Criar Lista") {
                iconName = "plus";
              } else if (route.name === "Histórico") {
                iconName = "history";
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            }
          })}
          tabBarOptions={{
            activeTintColor: "#4ba35e",
            inactiveTintColor: "gray",
            style: {
              paddingBottom: 7
            }
          }}
        >
          <Tab.Screen name="Criar Lista" component={ListStack} />
          <Tab.Screen name="Histórico" component={HistoryStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
