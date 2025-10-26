import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Share } from 'react-native';
import { smorfiaData, SmorfiaMeaning } from '../services/smorfiaData';
import SearchBar from '../components/SearchBar';
import { colors, typography } from '../styles';

const Item = ({item, navigation}: {item: SmorfiaMeaning, navigation: any}) => (
  <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })} style={styles.item}>
    <Text style={styles.id}>{item.id.toString().padStart(2, '0')}</Text>
    <Text style={styles.name}>{item.name}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const filteredData = smorfiaData.filter(item => {
    const itemData = `${item.id.toString().padStart(2, '0')} ${item.name.toLowerCase()}`;
    const textData = searchQuery.toLowerCase();
    return itemData.indexOf(textData) > -1;
  });

  const generateNumbers = (count) => {
    const numbers = [];
    while (numbers.length < count) {
      const randomNumber = Math.floor(Math.random() * 90) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    const generated = numbers.map(number => smorfiaData.find(item => item.id === number));
    setGeneratedNumbers(generated);
    setModalVisible(true);
  };

  const shareNumbers = () => {
    const message = generatedNumbers.map(item => `*${item.id}:* ${item.name}`).join('\n');
    Share.share({
      message: `Mis números de la suerte:\n${message}`,
      title: 'Mis números de la suerte',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SMORFIA ARGENTINA</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => generateNumbers(6)}>
            <Text style={styles.buttonText}>Dame 6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => generateNumbers(8)}>
            <Text style={styles.buttonText}>Dame 8</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar onSearch={setSearchQuery} />
      <Text style={styles.subtitle}>Todos los Números</Text>
      <FlatList
        data={filteredData}
        renderItem={({item}) => <Item item={item} navigation={navigation} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Tus números de la suerte</Text>
            <FlatList
              data={generatedNumbers}
              renderItem={({item}) => (
                <View style={styles.modalItem}>
                  <Text style={styles.modalItemId}>{item.id}</Text>
                  <Text style={styles.modalItemName}>{item.name}</Text>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={shareNumbers}
            >
              <Text style={styles.textStyle}>Compartir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.lightText,
  },
  subtitle: {
    ...typography.h2,
    margin: 16,
    marginBottom: 0,
  },
  item: {
    backgroundColor: colors.background,
    padding: 10,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    height: 100,
  },
  id: {
    ...typography.h2,
    color: colors.primary,
  },
  name: {
    ...typography.body,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.lightText,
    ...typography.button,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: colors.primary,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTitle: {
    ...typography.h2,
    marginBottom: 15,
  },
  modalItem: {
    backgroundColor: colors.background,
    padding: 10,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    height: 100,
    width: 120,
  },
  modalItemId: {
    ...typography.h2,
    color: colors.primary,
  },
  modalItemName: {
    ...typography.body,
    textAlign: 'center',
  }
});

export default HomeScreen;
