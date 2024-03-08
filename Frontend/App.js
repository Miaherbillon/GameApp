import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/Home';
import Game from './Pages/Game'
import CréeQuestion from './Pages/CréeQuestion';
import Compte from './Pages/MonCompte';

import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const color = 'yellow'


const App = () => {

  return (

    <NavigationContainer NavigationContainer >
      <Tab.Navigator>
        <Tab.Screen
          name="Accueil"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />),
          }}
        />
        <Tab.Screen
          name="Game"
          component={Game}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Octicons name="play" size={size} color={color} />),
          }}
        />
        <Tab.Screen
          name="Crée une question"
          component={CréeQuestion}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat-question-outline" size={size} color={color} />),
          }}
        />
        <Tab.Screen
          name="Moi"
          component={Compte}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="face-grin-wink" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
