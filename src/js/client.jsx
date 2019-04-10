/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { createStore } from 'redux';

import App from './components/App';
import mainReducer from './reducers/mainReducer';

import '../css/skeleton.css';
import '../css/style.css';

const store = createStore(
	mainReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const APP_INSTANCE = (
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);
const app = document.getElementById('app');
ReactDOM.render(APP_INSTANCE, app);
