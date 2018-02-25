import React, { Component } from 'react';

import {
  Link,
} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
const RoomsList = (props) =>{
  const rooms = props.rooms;
  const socket = props.socket;
  const listItems = rooms.map((room) =>
  <ListGroupItem key={room}><Link to={props.match.path + "/" + room}>{room}</Link></ListGroupItem>
)
 return (
   <div className='roomList'>
     <a  href='/'>Main</a>
   {rooms.length > 0 ?(

       <ListGroup>
         {listItems}
       </ListGroup>

   ): (
     <div>
       <p>No games. Create one</p>
     </div>
   )}
</div>
)}

export default RoomsList;
