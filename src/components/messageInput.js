import React, { Component } from 'react';


export default class MessageInput extends React.Component {
  constructor(props) {
   super(props);
   this.state = {message:''};
}
handleSubmit = (e)=>{
    e.preventDefault();
  this.sendMessage();
  this.setState({message:""})

}

sendMessage=()=>{
  this.props.sendMessage(this.state.message);
}
render() {
  const {message} =this.state;
      return(
        <form onSubmit={this.handleSubmit} >
        <input
          type="text"
          value={message}
          onChange = {
            ({target})=> this.setState({message:target.value})
          }
              />
        <input
          type="submit"
          disabled = { message.length < 1}
          className = "send"
          value='submit'
        />
        </form>
    )
  }
}
