import React,{lazy,Suspense} from 'react';
import {connect} from 'react-redux'
import  {Switch,Route} from 'react-router-dom';
import './App.css';
import Auth from './container/Auth/Auth';
import Contactus from './component/ContactUs/ContactUs';
import Aboutus from './component/AboutUs/AbountUs';

function App(){
  return (
    <div>
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/contactUs" component={Contactus}></Route>
        <Route path="/aboutUs" component={Aboutus}></Route>
      </Switch>

    </div>
  )
  }


export default App;
