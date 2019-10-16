import React from 'react';

import classes from './Toolbar.css';

import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;