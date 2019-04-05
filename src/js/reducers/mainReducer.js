/* eslint no-eval: "warn" */

import reduceReducers from 'reduce-reducers';

// import isValidGamestate from '../models/isValidGamestate';
import * as timetables from '../models/timetables';
import localizedTextTables from '../models/localizedTextTable';
// import { DEALER_LIBRARY, PLAYER_LIBRARY, shuffle } from '../models/shuffle';
import { CHOOSE_STORE, CLOSE_MODAL, CHANGE_LANG } from '../actions/userAction';

const initialState = {
	language: 'en',
	localizedTextTable: localizedTextTables['en'],
	modal: {
		shown: false,
		text: 'Something went wrong',
		action: 'closeModal',
	},
};
function changeLang(state, action) {
	if (action.type !== CHANGE_LANG) {
		return state;
	} else {
		let newState;
		console.log('changeLang', action.payload.lang);
		const lang = action.payload.lang;
		const localizedTextTable = localizedTextTables[lang];
		if (!localizedTextTable) {
			throw new Error(`no localized text table for ${lang}`);
		}

		return {
			...state,
			lang,
			localizedTextTable,
		};

		// switch (statement) {
		// 	case 'en': {
		// 		newState = {
		// 			...state,
		// 			lang: 'en',
		// 			localizedTextTable: en,
		// 		};
		// 		break; }
		// 	case 'no': {
		// 		newState = {
		// 			...state,
		// 			lang: 'no',
		// 			localizedTextTable: no,
		// 		};
		// 		break; }
		// 	default:
		// 		newState = {
		// 			...state,
		// 		};
		// }
		// return newState;
	}
}

function chooseStoreReducer(state, action) {
	if (action.type !== CHOOSE_STORE) {
		return state;
	} else {
		const store = action.payload.store;
		const newState = {
			...state,
			modal: {
				shown: true,
				text: state.localizedTextTable.to[store] + ' ' + timetables[store].to,
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
	changeLang,
	initialState
);
