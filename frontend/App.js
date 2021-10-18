import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from './input_range'

const App = () => {
  return (
    <View className="App" style={{marginLeft: 80, marginTop: 50}}>
      <Text>Welcome back, Chief!</Text>
      <Text style="auto">Please enter the desired maximum range in kilometers. <br/>
      This will be used to select the partners of our company falling in this range,
      and only display the in-range offices of the former.
      </Text>
      <Input/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
