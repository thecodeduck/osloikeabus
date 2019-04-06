/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

import App from './components/App';
import mainReducer from './reducers/mainReducer';

import '../css/skeleton.css';
import '../css/style.css';

const store = createStore(
	mainReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}><App /></Provider>, app);
