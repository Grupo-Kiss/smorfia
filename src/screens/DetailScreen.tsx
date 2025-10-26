
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography } from '../styles';

interface DetailScreenProps {
  route: {
    params: {
      item: {
        id: number;
        name: string;
      };
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DETALLE</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.id}>{item.id.toString().padStart(2, '0')}</Text>
        <Text style={styles.name}>{item.name}</Text>

      </View>
    </View>
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
  headerText: {
    ...typography.h1,
    color: colors.lightText,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  id: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: 10,
  },
  name: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: colors.lightText,
  },
});

export default DetailScreen;
