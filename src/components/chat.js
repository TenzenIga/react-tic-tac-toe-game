import React, { Component } from 'react';
import MessageInput from './messageInput';
import Messages from './message';
export default class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messages:[]
    }
  }
  sendMessage = (e) =>{
 const {messages} = this.state;
 const {socket, roomName, mark} = this.props;
 messages.push({'message':e , 'mark':mark}) //add object with message and sender to array
 socket.emit('messages', roomName)
 socket.emit(`Chat-${roomName}`, messages)
 this.setState({messages})
  }

  render() {
    const {roomName, socket} = this.props;
    const {messages} = this.state;
    socket.on(`Chat-${roomName}`, (d)=>{
     this.setState({messages:d})
   })

      return(
        <div className="chat-wrapper">
        <h3 className='text-center'>Chat</h3>
          <Messages messages={messages} />
          <MessageInput sendMessage ={this.sendMessage} />
      </div>
    )
  }
}
