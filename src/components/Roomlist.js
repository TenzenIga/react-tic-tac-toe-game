import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
const RoomsList = (props) =>{
  const rooms = props.rooms;
  const socket = props.socket;
  const listItems = rooms.map((room) =>
  <li key={room}><Link to={props.match.path + "/" + room}>{room}</Link></li>
)
 return (
   <div>
     <a  href='/'>Main</a>
   {rooms.length > 0 ?(

       <ul>
         {listItems}
       </ul>

   ): (
     <div>
       <p>No games. Create one</p>
     </div>
   )}
</div>
)}

export default RoomsList;
