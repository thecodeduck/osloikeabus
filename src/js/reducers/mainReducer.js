import reduceReducers from 'reduce-reducers';

// import isValidGamestate from '../models/isValidGamestate';
import modal from './modalReducer';
import * as timetables from '../models/timetables';
// import { DEALER_LIBRARY, PLAYER_LIBRARY, shuffle } from '../models/shuffle';
import { CHOOSE_STORE, CLOSE_MODAL } from '../actions/userAction';

const initialState = {
	lang: 'en',
	modal: {
		shown: false,
		text: 'Something went wrong',
		action: 'closeModal',
	},
};

function chooseStoreReducer(state, action) {
	if (action.type !== CHOOSE_STORE) {
		return state;
	} else {
		const store = action.payload.store;
		const newState = {
			...state,
			modal: {
				shown: true,
				text: timetables.this[store].to,
			},
		};
		console.log('chooseStore', action.payload.store);
		return newState;
	}
}

function closeModalReducer(state, action) {
	if (action.type !== CLOSE_MODAL) {
		return state;
	} else {
		let newState;
		const statement = state.modal.action;
		switch (statement) {
			case 'closeModal': {
				newState = {
					...state,
					modal: {
						shown: false,
						text: 'Something went wrong',
						action: 'closeModal',
					},
				};
				break; }
			default:
				newState = {
					...state,
					modal: {
						shown: false,
						text: 'Something went wrong',
						action: 'closeModal',
					},
				};
		}
		return newState;
	}
}

export default reduceReducers(
	chooseStoreReducer,
	closeModalReducer,
	initialState
);
