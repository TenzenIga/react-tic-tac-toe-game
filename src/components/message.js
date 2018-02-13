import React, { Component } from 'react';

export default class Messages extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
  const {messages} = this.props;
      return(
        <div className="messages">
          {
            messages.map((mes)=>{
              return(
                <p className='message'><b>{mes.mark}:</b>{mes.message}</p>
              )
            })
          }
      </div>
    )
  }
}
