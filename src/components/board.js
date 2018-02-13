
 import React, { Component } from 'react';
import Square from './square';
import io from 'socket.io-client';

const socketUrl = "http://127.0.0.1:4001";
export default class Board extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      turn: true,
      rooms:[],
      xIsNext: true,
      squares:Array(9).fill(null)
    };
  }

  makeMove(i){
    const {turn} = this.state;
    if(turn){
    const {roomName, socket, mark} = this.props;;
    const squares = this.state.squares.slice();
    socket.emit('MOVE', roomName)
    if (calculateWinner(squares) || squares[i]) {
  return;
          }
    squares[i] = mark;
    socket.emit(roomName, {squares, xIsNext:!this.state.xIsNext, turn:this.state.turn })
    this.setState({turn:!this.state.turn, squares})
  }else{
    return false;
  }
  }

  renderSquare(i) {
    return <Square
       value={this.state.squares[i]}
        onClick = {() => this.makeMove(i)}
        />;
  }

  render() {
    const status = calculateWinner(this.state.squares)? `${calculateWinner(this.state.squares)} wins` : null;
    const {socket} = this.props;
    const {roomName} = this.props;
    const {rooms, turn} = this.state;
     socket.on(roomName, (d)=>{
      this.setState({xIsNext: d.xIsNext, turn:d.turn, squares: d.squares})
    })

    return (
      <div>
        <h2>{status}</h2>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
</div>
    );
  }

}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
