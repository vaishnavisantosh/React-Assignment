import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        {/* <NavigationItem link="/dashboard" exact>DashBoard</NavigationItem> */}
        <NavigationItem link="/contactUs" exact>CONTACT US</NavigationItem>
        <NavigationItem link="/aboutUs" exact>ABOUT US</NavigationItem>



        {props.isAuthenticated ? <NavigationItem link="/dashboard">DASHBOARD</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;