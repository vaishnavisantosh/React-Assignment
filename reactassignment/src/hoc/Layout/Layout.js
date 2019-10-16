import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './Layout.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import { Menu, Container, Button } from 'semantic-ui-react';


class Layout extends Component {
    navItems = [ { title: 'home', to:'/' }, ];
    render () {
        return (
            <>
                <Toolbar
                    isAuth={this.props.isAuthenticated}/>
                
                <main className={classes.Content}>
                    {this.props.children}
                </main>

           {/* <Menu
              fixed="top"
            //   inverted
              pointing
              secondary
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as={Link} to="/work">Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' >
                    Log in
                  </Button>
                  <Button as='a'  primary style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu> */}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};

export default connect( mapStateToProps )( Layout );