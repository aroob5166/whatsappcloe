import { Avatar } from '@mui/material';
import React from 'react'
import "./SidebarChat.css";

function SidebarChat() {
  return (
    <div className='sidebarChat'>
        <Avatar src='./2.jpg'/>
        <div className='sidebarChat__info'>
            <h2>Archit</h2>
            <p>Hey!</p>
        </div>
    
  
</div>
  )
}


export default SidebarChat
