import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookmarkScreen from '../screens/BookmarkScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import colors from '../constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bookmark') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? 'brown' : colors.bigText}
            />
          );
        },
        tabBarLabel: ({focused}) => (
          <Text style={{color: focused ? 'brown' : colors.bigText}}>
            {route.name}
          </Text>
        ),
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          overflow: 'hidden',
          elevation: 5,
          backgroundColor: 'orange',
        },
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          title: 'Bookmark',
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="TabNavigator">
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobDetails"
          component={JobDetailsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
