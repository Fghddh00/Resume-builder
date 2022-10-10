import { Component } from "react";
import {Link, TopBar, Menu, TopBarLeft, TopBarRight, MenuItem, MenuText } from "react-foundation";


function NavigationBar(){
   
    
		

    return (
        
        <TopBar>

        <TopBarLeft className='my-top-bar-right'>
            <Menu>
                {/* make it have state */}
                <Link >Log In</Link>
                <MenuItem><a>View Resume</a></MenuItem>
            </Menu>
        </TopBarLeft>

        <TopBarRight className='my-top-bar-right'>
        <Menu>

            <MenuText>Build That Resume!!</MenuText>
            <MenuItem><a>LinkedIn</a></MenuItem>
            <MenuItem><a>FB</a></MenuItem>
            <MenuItem><a>Twitter</a></MenuItem>
        </Menu>
        </TopBarRight>

    </TopBar>
    )
}


export default NavigationBar;