/* eslint-env mocha */
import * as vet from 'vet';
import mainReducer from './mainReducer';

import isValidState from '../models/isValidState';

import { CHOOSE_STORE, CLOSE_MODAL } from '../actions/userAction';

const assert = vet.utils.assert;

const assertIsValidState = assert(
	isValidState,
	(val) => `bad state ${JSON.stringify(val)}`
);


describe(
	'Game Reducer',
	() => {
		it('can import state', () => {});

		it('initial state is valid', () => {
			const state = mainReducer();
			// state = mainReducer(state, {});
			assertIsValidState(state);
		});

		// it('can choose a store', () => {
		// 	let state = mainReducer();
		// 	const action = {
		// 		type: CHOOSE_STORE,
		// 		payload: { store: 'Furuset' },
		// 	};
		// 	state = mainReducer(state, action);
		// 	console.log(state);
		// 	assertIsValidGamestate(state);
		// });
	}
);
