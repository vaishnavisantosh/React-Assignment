import React from 'react';

import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const navigationItems = (props) => (

    <Menu>
        <Menu.Item
            name='ABOUT US'
            as={Link} to="/aboutUs"
            exact
        />

        <Menu.Item
            name='CONTACT US'
            as={Link} to="/contactUs"
            exact
        />


        {props.isAuthenticated ?
            <Menu.Item
                name='POSTS'
                as={Link} to="/posts"
                exact
            /> : null}
        {!props.isAuthenticated
            ? <Menu.Item
                name='SIGN UP'
                as={Link} to="/auth"
                exact
                position='right'
            />
            : <Menu.Item
                name='LOGOUT'
                as={Link} to="/logout"
                exact
                position='right'
            />}
    </Menu>
);

export default navigationItems;