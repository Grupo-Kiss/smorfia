import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Share, ScrollView } from 'react-native';
import { smorfiaData, SmorfiaMeaning } from '../services/smorfiaData';
import { colors, typography } from '../styles';

// Paleta de colores completa para el mosaico
const fullColorPalette = [colors.verdeLima, colors.naranjaCalido, colors.rojoCoral, colors.amarilloSuave, colors.primary, colors.accent];

// Placeholder for Gemini API call
const getGeminiDefinition = (term: string) => {
  console.log(`Buscando definición para: ${term}`);
  // En una implementación real, aquí se haría una llamada a la API de Gemini.
  return `Definición para "${term}": tradicionalmente asociado con la suerte, los presagios y las interpretaciones oníricas en la cultura popular. Representa una conexión entre el mundo material y el espiritual.`;
};


// Componente para cada item en la grilla principal (mosaico)
const GridItem = ({ item, index }: { item: SmorfiaMeaning, index: number }) => {
  const bgColor = fullColorPalette[index % fullColorPalette.length];
  return (
    <View style={[styles.gridItem, { backgroundColor: bgColor }]}>
      <Text style={[styles.gridItemId, { color: colors.lightText }]}>{item.id.toString().padStart(2, '0')}</Text>
      <Text style={[styles.gridItemName, { color: colors.lightText }]}>{item.name}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const [singleResult, setSingleResult] = useState<SmorfiaMeaning | null>(null);
  const [definition, setDefinition] = useState<string | null>(null);
  const [randomNumbers, setRandomNumbers] = useState<SmorfiaMeaning[]>([]);

  // Oculta los resultados anteriores
  const clearResults = () => {
    setSingleResult(null);
    setDefinition(null);
    setRandomNumbers([]);
  };

  // Muestra un solo numero y su definicion
  const showSingleNumber = () => {
    clearResults();
    const [number] = smorfiaData.sort(() => 0.5 - Math.random()).slice(0, 1);
    setSingleResult(number);
    setDefinition(getGeminiDefinition(number.name));
  };

  // Genera y muestra una cantidad de numeros al azar
  const showMultipleNumbers = (count: number) => {
    clearResults();
    const numbers = new Set<SmorfiaMeaning>();
    while (numbers.size < count) {
      const randomNumber = smorfiaData[Math.floor(Math.random() * smorfiaData.length)];
      numbers.add(randomNumber);
    }
    setRandomNumbers(Array.from(numbers));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainContent}>
          {/* --- CONTENEDOR DE BOTONES --- */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary}]} onPress={showSingleNumber}>
              <Text style={styles.buttonText}>DAME 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: colors.secondary}]} onPress={() => showMultipleNumbers(6)}>
              <Text style={[styles.buttonText, {color: colors.text}]}>DAME 6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: colors.secondary}]} onPress={() => showMultipleNumbers(8)}>
              <Text style={[styles.buttonText, {color: colors.text}]}>DAME 8</Text>
            </TouchableOpacity>
          </View>

          {/* --- RESULTADO DAME 1 --- */}
          {singleResult && (
            <>
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Salió el:</Text>
                <Text style={styles.resultNumber}>{singleResult.id.toString().padStart(2, '0')}</Text>
                <Text style={styles.resultMeaning}>{singleResult.name}</Text>
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Definición Ampliada</Text>
                <Text style={styles.infoMeaning}>{definition}</Text>
              </View>
            </>
          )}

          {/* --- RESULTADOS DAME 6/8 --- */}
          {randomNumbers.length > 0 && (
            <View style={styles.randomNumbersContainer}>
              <FlatList
                data={randomNumbers}
                renderItem={({ item }) => (
                  <View style={styles.randomNumberItem}>
                    <Text style={styles.resultNumber}>{item.id.toString().padStart(2, '0')}</Text>
                    <Text style={styles.resultMeaning}>{item.name}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
              />
            </View>
          )}
        </View>

        {/* --- GRILLA PRINCIPAL (MOSAICO) --- */}
        <View style={styles.numbersGridContainer}>
          <Text style={styles.subtitle}>Todos los Números</Text>
          <FlatList
            data={smorfiaData}
            renderItem={({ item, index }) => <GridItem item={item} index={index} />}
            keyExtractor={item => item.id.toString()}
            numColumns={3} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContent: {
    padding: 16,
  },
  // Botones
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.h2,
    fontSize: 16,
    color: colors.lightText,
    fontWeight: '700',
  },
  // Secciones de resultado
  resultContainer: {
    backgroundColor: colors.accent,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  resultText: {
    color: colors.lightText,
    fontSize: 18,
    fontWeight: '500',
  },
  resultNumber: {
    color: colors.lightText,
    fontSize: 60,
    fontWeight: '700',
  },
  resultMeaning: {
    color: colors.lightText,
    fontSize: 24,
    fontWeight: '700',
  },
  infoSection: {
    marginTop: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'rgba(0, 51, 102, 0.1)',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: colors.text,
  },
  infoMeaning: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.text,
  },
  // Grilla de numeros aleatorios
  randomNumbersContainer: {
    marginTop: 16,
  },
  randomNumberItem: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 16,
    margin: 4,
    alignItems: 'center',
  },
  // Grilla principal (mosaico)
  numbersGridContainer: {
    marginTop: 16,
    padding: 16,
  },
  subtitle: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: 16,
  },
  gridItem: {
    flex: 1,
    padding: 8,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  gridItemId: {
    fontWeight: '700',
    fontSize: 20,
  },
  gridItemName: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;
