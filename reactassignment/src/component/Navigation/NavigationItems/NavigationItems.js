import React from 'react';
import {withRouter} from 'react-router-dom'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const navigationItems = (props) => {
    const isApp = props.location.pathname.includes('/app');
    
   
    console.log('props', props);

   
    const isAdmin = localStorage.getItem('userType') === 'admin';
    console.log('isAdmin', isAdmin)
    return (<Menu>
        {!isApp &&
            <>
            {props.isAuthenticated ?
                <>
                {isApp ?
                <>
                <Menu.Item
                    name='home'
                    as={Link} to="/"
                    
                /> 
                
                
                </>
                :
                <Menu.Item
                    name='dashboard'
                    as={Link} to={isAdmin? '/app/dashboard': '/app/posts'}
                    exact
                />
               
                }
        
                </> : null}
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
            
    </>
        }
    
            { isApp && props.isAuthenticated ?
                <>
                <Menu.Item
                    name='home'
                    as={Link} to="/"
                   
                />
                <Menu.Item
                    name='POSTS'
                    as={Link} to="/app/posts"
                    exact
                />
                
                </> 
                : null}
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
        )
            }


export default withRouter( navigationItems);