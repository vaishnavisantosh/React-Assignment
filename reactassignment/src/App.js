import React from 'react';
import logo from './logo.svg';
import  {Switch,Route} from 'react-router-dom';
import './App.css';
import Auth from './container/Auth/Auth';

function App(){
  return (
    <div>
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route ></Route>
      </Switch>

    </div>
  )
  }


export default App;
