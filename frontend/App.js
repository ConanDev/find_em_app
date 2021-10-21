import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView} from 'react-native';
import Input from './input_range'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const ChildRender = ({item, index}) => {
  return (
    <View>
        <Text style={styles2.item}>{"#" + index +" " + item}</Text>
    </View>
  );
}

const ParentRender = ({item}) => {
  return(
    <View>
      <Text style={styles2.container}>Office:</Text>
      <Text >{item}</Text>
    </View>
  )
}

const BigList = () => {
  const f1 = <FlatList data={['a','b','c']} renderItem={ChildRender}/>
  const f2 = <FlatList data={['d','e','f']} renderItem={ChildRender} />
  const f3 = <FlatList data={[f1,f2]} renderItem={ParentRender} />
  return f3;
}

const App = () => {
  return (
    <View className="App" style={{marginLeft: 80, marginTop: 50}}>
      <Text>Welcome back, Chief!</Text>
      <Text style={styles.container}>Please enter the desired maximum range in kilometers. <br/>
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

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  item: {
    marginLeft: 20,
    marginTop: 20,
    padding: 30,
    backgroundColor: '#ffc600',
    fontSize: 24
  }
  });

export default App;
