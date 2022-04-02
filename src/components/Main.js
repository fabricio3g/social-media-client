import { Container, Menu, Segment } from "semantic-ui-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from '../utils/contextAuth'

const Main = ({children})=> {
    const {user, logout} = useContext(AuthContext)
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substring(1)
    const [ activeItem, setActive] =  useState(
        path
    )
    const handleItemClick = (e, { name }) => setActive(name);
   const mainBar = user ? (
   
      <Container>
    <Menu pointing secondary size="massive" color="olive">
      <Menu.Item
        name={user.username}
        active
        
        as={Link}
        to='/'
      />
      
      <Menu.Menu position="right">
      <Menu.Item
        name="logout"
        onClick={logout}
      />
       
      </Menu.Menu>
    </Menu>

      {children}
    
    </Container>
  
   ) : (
      
        <Container>
      <Menu pointing secondary size="massive" color="olive">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to='/'
        />
        
        <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
        </Menu.Menu>
      </Menu>

        {children}
      
      </Container>
    
   )
   return mainBar
}

export default Main