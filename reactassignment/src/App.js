import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NewPost from './container/Posts/NewPost'

import Layout from './hoc/Layout/Layout';

import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import posts from './container/Posts/Post';
import Auth from './container/Auth/Auth';
import AboutUs from './component/AboutUs/AbountUs';
import ContactUs from './component/ContactUs/ContactUs';


// const asyncOrders = asyncComponent(() => {
//   return import('./containers/Orders/Orders');
// });

// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth');
// });

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/aboutUs" exact component={AboutUs} />
        <Route path="/contactUs" exact component={ContactUs} />
        {/* <Redirect to="/" /> */}
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      let userId=localStorage.getItem('userId');
      console.log(userId);
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/posts/newPost"  component={NewPost}/>
          <Route path="/posts" component={posts} />

          <Route exact path="/aboutUs" exact component={AboutUs} />
          <Route exact path="/contactUs" component={ContactUs}></Route>
          {/* <Redirect to="/" /> */}
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
