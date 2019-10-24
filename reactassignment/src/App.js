import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NewPost from './container/Posts/NewPost'
import Preview from './component/Post/previewPost';
import Layout from './hoc/Layout/Layout';

import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Posts from './container/Posts/Posts';
import Auth from './container/Auth/Auth';
import AboutUs from './component/AboutUs/AbountUs';
import ContactUs from './component/ContactUs/ContactUs';
import NotFound from './component/404/NotFound';
import DashBoard from './container/DashBoard/Dashboard';
import Home from './container/Home/Home';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let username;
    let isAdmin;
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/aboutUs" exact component={AboutUs} />
        <Route path="/contactUs" exact component={ContactUs} />
        
        <Route exact path="/" exact component={Home} />
        <Route  component={NotFound}/>
        {/* <Redirect to="/" /> */}
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
    let  userType=localStorage.getItem('useType');
      if(userType=='admin'){
        isAdmin=true
      }
      else{
        isAdmin=false
      }

      
      //console.log(userId);
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/app/preview/:id" component={Preview}/>
          <Route path="/app/posts/:id"  component={NewPost}/>
          <Route path="/app/posts" component={Posts} />} />
          <Route exact path="/aboutUs" exact component={AboutUs} />
          <Route exact path="/contactUs" component={ContactUs}></Route>
          {isAdmin &&
          <Route exact path="/app/dashboard" exact component={DashBoard} />
          }
          {/* <Route exact path="/" exact component={Home} /> */}
          {/* <Redirect to="/" /> */}
          <Route  component={NotFound}/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout  >

          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
