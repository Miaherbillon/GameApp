import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Home from './Pages/Home';
import Game from './Pages/Game';
import CréeQuestion from './Pages/CréeQuestion';
import Compte from './Pages/MonCompte';
import Inscription from './Pages/InscriptionConnexion';

const Tab = createBottomTabNavigator();

const App = () => {
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(Boolean);

  useEffect(() => {
    const retrieveAndVerifyUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId !== null) {
          setUserId(storedUserId);
          setLoading(true);
        }
      } catch (error) {
        setErrorMessage('Une erreur s\'est produite lors de la récupération du userID');
      }
    };

    retrieveAndVerifyUserId();
  }, [reload]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background: 'black',
      card: 'rgb(228, 228, 228)',
      text: 'gray',
      tabBarBackground: 'gray',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {loading ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'rgb(98, 183, 200)',
            inactiveTintColor: 'gray',
            style: {
              backgroundColor: 'gray',

            },

          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Game"
            // component={Game}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Octicons name="play" size={size} color={color} />
              ),
            }}
          >
            {() => <Game setReload={setReload} reload={reload} />}

          </Tab.Screen>
          <Tab.Screen
            name="Créer une question"
            // component={CréeQuestion}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="chat-question-outline" size={size} color={color} />
              ),
            }}
          >
            {() => <CréeQuestion setReload={setReload} reload={reload} />}
          </Tab.Screen>
          <Tab.Screen
            name="Moi"
            // component={Compte}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="user" size={size} color={color} />
              ),
            }}
          />
          {() => <Compte setReload={setReload} reload={reload} setUserId={setUserId} />}

        </Tab.Navigator>
      ) : (
        <Inscription setUserId={setUserId} setLoading={setLoading} />
      )}
    </NavigationContainer>
  );
};

export default App;
