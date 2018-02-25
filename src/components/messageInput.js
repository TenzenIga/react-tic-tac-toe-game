import React, { Component } from 'react';
import {FormGroup, FormControl} from 'react-bootstrap'

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
        <form className="input" onSubmit={this.handleSubmit} >
          <FormGroup
          >
            <FormControl
          type="text"
          value={message}
          onChange = {
            ({target})=> this.setState({message:target.value})
          }
              />
      </FormGroup>
        </form>
    )
  }
}
