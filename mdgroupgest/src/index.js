import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {}
const mockStore = configureStore()

let store

store = mockStore(initialState)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>   ,  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
