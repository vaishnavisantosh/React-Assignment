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
        <Route  component={NotFound}/>
        {/* <Redirect to="/" /> */}
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      let userId=localStorage.getItem('userId');

      
      //console.log(userId);
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/preview/:id" component={Preview}/>
          <Route path="/posts/:id"  component={NewPost}/>
          <Route path="/posts" component={Posts} />} />
          <Route exact path="/aboutUs" exact component={AboutUs} />
          <Route exact path="/contactUs" component={ContactUs}></Route>
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
