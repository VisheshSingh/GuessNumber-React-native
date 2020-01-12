import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: colors.accent,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 2
  },
  number: {
    fontSize: 22,
    color: colors.accent
  }
});

export default NumberContainer;
