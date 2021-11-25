// import SplashScreen from 'react-native-splash-screen';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import SignUp2 from './screens/SignUp2';

import TabBar from './components/TabBar';
import {TabNavHeader} from './components/TabNavHeader';
import {HomeStackHeader} from './components/HomeStackHeader';
import FlashMessage from 'react-native-flash-message';
import Login from './screens/Login';
import More from './screens/More';
import AlarmTab from './screens/AlarmTab';
import ProfileTab from './screens/ProfileTab';
import {MoreStackHeader} from './components/MoreStackHeader';
import ForgetPassword from './screens/ForgetPassword';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const LoginNavigation = () => (
  <Stack.Navigator
    screenOptions={{header: () => null}}
    initialRouteName={'Login'}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp2} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
  </Stack.Navigator>
);

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        header: HomeStackHeader,
      })}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const MoreStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        header: MoreStackHeader,
      })}
      initialRouteName={'More'}>
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => (
  <Tab.Navigator
    tabBar={props => <TabBar {...props} />}
    tabBarHideOnKeyboard
    screenOptions={({route}) => ({
      header: TabNavHeader,
    })}>
    <Tab.Screen name="LocationTab" component={HomeStack} />
    <Tab.Screen
      name="AlarmTab"
      options={{
        tabBarLabel: '',
      }}
      component={AlarmTab}
    />
    <Tab.Screen name="SettingTab" component={ProfileTab} />
    <Tab.Screen name="LogOutTab" component={MoreStack} />
  </Tab.Navigator>
);

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('');
  useEffect(() => {
    (async () => {
      let userData = auth().currentUser;
      if (userData === undefined || userData === null) {
        setInitialRoute('LoginNavigation');
        setIsReady(true);
      } else {
        setInitialRoute('HomeNavigation');
        setIsReady(true);
      }
    })();
  }, []);

  return !isReady ? (
    <View />
  ) : (
    <>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{header: () => null}}
            initialRouteName={initialRoute}>
            <Stack.Screen name="LoginNavigation" component={LoginNavigation} />
            <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      <FlashMessage position="top" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
