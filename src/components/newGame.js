import React, { Component } from 'react';
import Board from './board';
import Chat from './chat';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

export default class NewGame extends React.Component{
  constructor(props) {
    super(props)
  }

componentWillMount(){
  const room = parseInt(this.props.match.params.number, 10);
  const {status} = this.props;
  const {socket} = this.props;
  console.log(status);
  if(status){
      this.props.createGame()
  }else{
    console.log("go");
    this.props.joinRoom(room)
  }
}

render(){
  const {socket, mark} = this.props;

  const room = this.props.roomName || parseInt(this.props.match.params.number, 10);
  return(
      <div className="login">
        <a href='/'>Main</a>
        <p>{this.props.text}</p>
        <p>Room № {room}</p>
        <p>Players- {socket.id}</p>
          <Board socket = {socket} roomName={room} mark = {mark}/>
          <Chat socket={socket} roomName={room} mark={mark}/>
      </div>
    );
    }
}
