import React from 'react';
import Dice from './Dice';
import { Button, View, Body } from 'native-base'
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { rollDice, newGame, postScore } from '../actions/currentGame';
import { Grid, Col } from 'react-native-easy-grid';

const styles = {
  dice: {
    marginBottom: 5,
    marginTop: 5,
  }
}

class Board extends React.Component {
  state = { gameOver: false }

  calcScore = () => {
    let { scores } = this.props;
    return scores.map( s => s.score )
      .reduce( ( total, score ) => {
        return total + score
      }, 0)
  }

  checkEndGame = () => {
    let { scores } = this.props;
    let gameOver = true;
    scores.map( s => s.score )
      .forEach( score => {
        if (score === null)
          gameOver = false;
      });

    if (gameOver && !this.state.gameOver) {
      let score = this.calcScore();
      this.props.dispatch(postScore(score))
      this.setState({ gameOver });
    }
  }

  newGame = () => {
    this.props.dispatch(newGame(() => { this.setState({ gameOver: false }); }));
  }

  renderButton = () => {
    let { roll, dispatch } = this.props;
    let maxRoll = roll === 3;
    let disabled = maxRoll ? { disabled: true } : {}
    let { gameOver } = this.state;
    if (gameOver) {
      return (
        <Button full onPress={this.newGame}>
          <Text>
            New Game?
          </Text>
        </Button>
       )
    } else {
      return (
        <Button
          full
          onPress={() => dispatch(rollDice())}
          {...disabled}
        >
          <Text>
            { maxRoll ? 'Score Roll' : 'Roll' }
          </Text>
        </Button>
      )
    }
  }

  renderDice = () => {
		let { roll, dice, keep, dispatch } = this.props;
    if (roll > 0) {
      return dice.map( (d, i) => {
        let kept = keep.includes(i);
        return (
          <Col style={styles.dice} key={i}>
            <Body>
              <Dice index={i} value={d} kept={kept} />
            </Body>
          </Col>
        )
      })
    }
  }

  render() {
    this.checkEndGame();

    return (
      <View>
        { this.renderButton() }
        <Grid>
          { this.renderDice() }
        </Grid>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let { dice, keep, roll, scores } = state.currentGame;
  return { dice, keep, roll, scores }
}

export default connect(mapStateToProps)(Board);
