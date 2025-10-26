
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { colors, typography } from '../styles';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por número o palabra..."
        placeholderTextColor={colors.text}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background,
  },
  input: {
    height: 45,
    borderColor: colors.primary,
    borderWidth: 2,
    paddingHorizontal: 15,
    backgroundColor: colors.lightText,
    fontSize: typography.body.fontSize,
    color: typography.body.color,
  },
});

export default SearchBar;
