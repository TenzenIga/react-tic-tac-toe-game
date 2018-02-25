
import React, { Component } from 'react';
import Board from './board';
import NewGame from './newGame';
import RoomsList from './Roomlist';
import Layout from './layout.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

class Rooms extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
const {rooms} = this.props
const {socket} = this.props
return (
<Switch>
  <Route exact path="/rooms" render ={(props) =>(
    <RoomsList {...props} rooms ={rooms} socket= {socket}/>
    )}/>
  <Route path='/rooms/:number' render ={(props) =>(
    <NewGame {...props} joinRoom = {this.props.joinRoom} mark ="O" socket= {socket}/>
  )}/>
</Switch>
)}}
export default Rooms;
