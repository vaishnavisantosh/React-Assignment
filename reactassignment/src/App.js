import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NewPost from './container/Posts/NewPost'
import Preview from './component/Post/previewPost';
import Layout from './hoc/Layout/Layout';
import Charts from './component/Charts/charts';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';
//import Posts from './container/Posts/Posts';
//import Auth from './container/Auth/Auth';
import AboutUs from './component/AboutUs/AbountUs';
import ContactUs from './component/ContactUs/ContactUs';
import NotFound from './component/404/NotFound';
import DashBoard from './container/DashBoard/Dashboard'
import Home from './container/Home/Home';
import { resolve } from 'dns';


const Auth = React.lazy(() => { return new Promise(resolve =>{setTimeout(()=>resolve( import('./container/Auth/Auth')),1000); })});
const Posts = React.lazy(() => { return new Promise(resolve =>{setTimeout(()=>resolve( import('./container/Posts/Posts')),1000); })});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let username;
    let isAdmin;
    let routes = (
      <Switch>
        <Route path="/auth" exact render={() => <Auth />} />
        <Route path="/aboutUs" exact component={AboutUs} />
        <Route path="/contactUs" exact component={ContactUs} />

        <Route path="/" component={Home} />

        <Route component={NotFound} />
        {/* <Redirect to="/" /> */}
      </Switch>
    );

    if (this.props.isAuthenticated) {
      let userType = localStorage.getItem('useType');
      if (userType === 'admin') {
        isAdmin = true
      }
      else {
        isAdmin = false
      }


      //console.log(userId);
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/app/preview/:id" component={Preview} />
          <Route path="/app/posts/:id" component={NewPost} />
          <Route path="/app/posts" render={() => <Posts />} />
          {/* <Route path="/app/posts" component={Posts} /> */}

          <Route exact path="/aboutUs" exact component={AboutUs} />
          <Route exact path="/app/charts" component={Charts} />
          <Route exact path="/app/dashboard" component={DashBoard} />

          {/* <Route exact path="/contactUs" component={ContactUs}></Route> */}

          {isAdmin &&
            <>
              <Route exact path="/app/dashboard" component={DashBoard} />
              <Route exact path="/app/charts" component={Charts} />
            </>
          }
          <Route path="/" component={Home} />
          <Route component={NotFound} />

        </Switch>
      );
    }

    return (
      <div>
        <Layout  >
          <Suspense fallback={<p>Loading................!!</p>}>
          {routes}
          </Suspense>
        

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
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
