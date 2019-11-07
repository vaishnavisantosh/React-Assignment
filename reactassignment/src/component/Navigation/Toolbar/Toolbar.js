import React,{useRef} from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = ( props ) => {

   

 return(
 <header className={classes.Toolbar}>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}
            
            />
        </nav>
    </header>)
};

export default Toolbar;