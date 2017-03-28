import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToolbarAndroid
} from 'react-native';
import StatusBarBackground from './App/Components/StatusBarBackground'
import ViewContainer from './App/Components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome';

let board = [
  "", "", "", "", "", "", "", "", ""
]

export default class TicTacToe extends Component {
  constructor(props) {
    super(props)
    const defaultBoard = {
      playerOne: {
        symbol: 'X',
        wins: 0,
      },
      playerTwo: {
        symbol: 'O',
        wins: 0,
      },
      currentTurn: 'X',
      board:   [
        "", "", "", "", "", "", "", "", ""
      ],
      draws: 0,
      winner: null
    }
    this.state = defaultBoard
  }

  render() {
    return (
      <ViewContainer style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tic Tac Toe</Text>
        </View>
        <View style={styles.scores}>
          <View style={styles.scoresHeader}>
            <Text style={styles.text}>
              Player X{"\n"}{this.state.playerOne.wins}
            </Text>
            <Text style={styles.text}>
              Draw{"\n"}{this.state.draws}
            </Text>
            <Text style={styles.text}>
              Player O{"\n"}{this.state.playerTwo.wins}
            </Text>
          </View>
        </View>
        <View style={styles.boardContainer}>
          <View style={styles.board}>
            {this.state.board.map((cell, index) => {
              return this._renderSquare(cell, index);
            })}
          </View>
        </View>
        <Icon.ToolbarAndroid
          titleColor='#FF414B'
          onActionSelected={this._onActionSelected}
          style={styles.toolbar}
          subtitle={this.state.actionText}
          actions={[{title: 'New Match', navIconName: "play", onIconClicked: () => this.resetMatchState(),show: 'always'},
                    {title: 'Restart Game', navIconName: "play", onIconClicked: () => this.resetGameState(), show: 'always'}]}/>
      </ViewContainer>
    );
  }


  _renderSquare(square, index) {
    return (
      <TouchableOpacity key={index} style={styles.square} onPress={() => this.handleClick(index)}>
        <Text style={styles.squareText}>
          {square}
        </Text>
      </TouchableOpacity>
    )
  }

  checkForWinner() {
    let board = this.state.board
    let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    return winningCombos.find((combo) => {
      if(this.boardHasCombo(combo)) {
        this.updateWinner(board[combo[0]])
        return true
      } else {
        return false
      }
    })
  }

  boardHasCombo(combo) {
    let board = this.state.board
    return (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]]) && (board[combo[1]] !== "" && board[combo[1]] === board[combo[2]])
  }

  checkDraw() {
    var board = this.state.board
    return ((board[0] === 'X' || board[0] === 'O') && (board[1] === 'X' || board[1] === 'O') && (board[2] === 'X' || board[2] === 'O') &&
           (board[3] === 'X' || board[3] === 'O') && (board[4] === 'X' || board[4] === 'O') && (board[5] === 'X' || board[5] === 'O') &&
           (board[6] === 'X' || board[6] === 'O') && (board[7] === 'X' || board[7] === 'O') && (board[8] === 'X' || board[8] === 'O'))
  }

  adjustScores() {
    let state = this.state
    if(state.winner == null) {
      let draws = state.draws + 1
      this.setState({
        draws: draws
      })
    } else {
      if(state.winner === state.playerOne.symbol) {
        let playerOneWins = state.playerOne.wins + 1
        this.setState({
          playerOne: {
            wins: playerOneWins
          }
        })
      } else {
        let playerTwoWins = state.playerTwo.wins + 1
        this.setState({
          playerTwo: {
            wins: playerTwoWins
          }
        })
      }
    }
  }

  updateWinner(winner) {
    console.log("updateWinner" + winner)
    this.state.winner = winner
  }

  resetMatchState() {
      var playerOneWins = this.state.playerOne.wins
      var playerTwoWins = this.state.playerTwo.wins
      var draws = this.state.draws
      this.setState({
        playerOne: {
          symbol: 'X',
          wins: playerOneWins
        },
        playerTwo: {
          symbol: 'O',
          wins: playerTwoWins
        },
        currentTurn: 'X',
        board: [
          "", "", "", "", "", "", "", "", ""
        ],
        winner: null,
        draws: draws
      })
    }

  resetGameState() {
      this.setState({
          playerOne: {
            symbol: 'X',
            wins: 0,
          },
          playerTwo: {
            symbol: 'O',
            wins: 0,
          },
          currentTurn: 'X',
          board:   [
            "", "", "", "", "", "", "", "", ""
          ],
          draws: 0,
          winner: null
        })
    }
  handleClick(index) {
    if(this.state.board[index] === "") {
      this.state.board[index] = this.state.currentTurn
      this.setState({
        currentTurn: this.state.currentTurn === this.state.playerOne.symbol ? this.state.playerTwo.symbol : this.state.playerOne.symbol
      })
      if(this.checkForWinner() || this.checkDraw()) {
        this.adjustScores()
      }
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#555555'
  },
  header: {
    backgroundColor: '#FF414B',
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    padding: 0
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  scoresHeader: {
    justifyContent: "center",
    flexDirection: "row"
  },
  allScores: {
    justifyContent: "center",
    flexDirection: "row",
    padding: 20
  },
  scores: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  board: {
    width: 300,
    height: 300,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  square: {
    borderWidth: 5,
    borderColor: '#00B3FA',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boardContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 4
  },
  squareText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 60
  },
  toolbar: {
    height: 56,
    backgroundColor: 'grey',
    justifyContent: "center"
  }
});

AppRegistry.registerComponent('TicTacToe', () => TicTacToe);
