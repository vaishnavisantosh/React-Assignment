import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import 'semantic-ui/dist/semantic.min.css';


import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducer/auth';

const composeEnhancers = compose;

// const rootReducer = combineReducers({
//     burgerBuilder: burgerBuilderReducer,
//     order: orderReducer,
//     auth: authReducer
// });

const store = createStore(authReducer,composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
//registerServiceWorker();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
