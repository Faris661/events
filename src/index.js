import React from 'react';
import ReactDOM from 'react-dom';
import './styles.less';
import Navbar from './components/Navbar';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducers from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import Router from './Router/Router';

const store = createStore(
  rootReducers, 
  composeWithDevTools(applyMiddleware(thunk))
  );

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Router></Router>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
