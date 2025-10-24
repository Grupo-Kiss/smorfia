import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { smorfiaData, SmorfiaMeaning } from './services/smorfiaData';

const Item = ({item}: {item: SmorfiaMeaning}) => (
  <View style={styles.item}>
    <Text style={styles.id}>{item.id.toString().padStart(2, '0')}</Text>
    <Text style={styles.name}>{item.name}</Text>
  </View>
);

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={smorfiaData}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  id: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 18,
    marginLeft: 16,
    color: '#555',
  },
});

export default HomeScreen;
