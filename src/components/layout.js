import React, { Component } from 'react';
import io from 'socket.io-client';
import Rooms from './Rooms';
import NewGame from './newGame';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


const socketUrl = "http://127.0.0.1:4001";
export default class Layout extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      text: "New game",
      message:null,
      rooms:[],
      roomName:null,
      socket:null,
      ready:false,
      class:'on'
    };
  }
componentWillMount(){
    this.initSocket()
}
componentDidMount(){
  this.getAllRooms()
}
 getAllRooms = () =>{
   const {socket} = this.state;
   socket.emit('allrooms','give all rooms');
   socket.on('allrooms', (data) =>{
       console.log(data);
     this.setState({rooms:data});
   }
 )
 }

 joinRoom = (e) =>{  // click room name, send it to the server to join and set roomname in states
   const room = e;
   const {socket} = this.state;
   console.log(e);
   socket.emit('join', room);
   console.log("!!!!" + e);
 }

  initSocket = ()=>{  //init socket connection
    const socket = io(socketUrl)
    socket.on('connection', ()=>{
        console.log("Connected");
      })
    this.setState({socket})
  }


  handleClick = ()=>{
    this.setState({class:"off"});

  }


  createGame = () =>{  // create random roomId
    const room = Math.floor((Math.random()*100) + 1)
    console.log(room);
    const {socket} = this.state;
    socket.emit('room', room);
    this.setState({text:"Waiting for opponent", roomName: room})

  }


  render() {
  const {status} = this.state;
  const {socket} = this.state;
  const {roomName} = this.state;
  let {rooms} = this.state;
    return (
      <div class='menu'>
        <Switch>
          <ButtonToolbar>
<LinkContainer onClick={this.handleClick}  to="/game"><Button bsStyle="primary" className={this.state.class} >New Game</Button></LinkContainer>
            <Route exact path='/game' render ={(props) =>(
              <NewGame {...props} status={true} createGame = {this.createGame}  text = {this.state.text} socket ={socket} roomName = {roomName} mark = "X" />
          )} />
          <LinkContainer onClick={this.handleClick}  to="/rooms"><Button bsStyle="primary" className={this.state.class}>Join game</Button></LinkContainer>
        <Route path="/rooms" render ={(props) =>(
          <Rooms {...props} rooms ={rooms} joinRoom={this.joinRoom}  socket= {socket}/>
        )}/>
      </ButtonToolbar>
    </Switch>
</div>
    );
  }
}
