import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const GameScreen = props => {
  const generateRandomNum = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
      return generateRandomNum(min, max, exclude);
    } else {
      return rndNum;
    }
  };

  const [roundCount, setRoundCount] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNum(1, 100, props.userChoice)
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(roundCount);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextInputHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'higher' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!!!", 'Try out once more...', [
        { text: 'Try Again', style: 'cancel' }
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomNum(
      currentLow.current,
      currentHigh.current,
      currentHigh
    );

    setCurrentGuess(nextNumber);
    setRoundCount(roundCount => roundCount + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Choice:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='LOWER' onPress={nextInputHandler.bind(this, 'lower')} />
        <Button
          title='HIGHER'
          onPress={nextInputHandler.bind(this, 'higher')}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;
