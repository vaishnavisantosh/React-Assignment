import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import classes from './Layout.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
//import { Menu, Container, Button } from 'semantic-ui-react';


class Layout extends Component {
   
    render () {
        return (
            <>
                <Toolbar
                    isAuth={this.props.isAuthenticated}/>
                
                <main className={classes.Content}>
                    {this.props.children}
                </main>

         
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect( mapStateToProps )( Layout );