import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import Board from './Board';
import ScoreCard from './ScoreCard';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Yahtzee = () => (
  <View>
    <ScrollView style={styles.scoreCard}>
      <ScoreCard endGame={this.endGame} />
    </ScrollView>
    <View>
      <Board style={styles.board} />
    </View>
  </View>
)

const styles = {
  scoreCard: {
    backgroundColor: '#E6E6FA',
    height: deviceHeight - 200,
  },
  score: {
    backgroundColor: '#00FF00',
    color: 'white',
  },
}

export default Yahtzee;
