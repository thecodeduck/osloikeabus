export const CLOSE_MODAL = 'user:closeModal';
export const CHOOSE_STORE = 'user:chooseStore';
export const CHANGE_LANG = 'user:changeLang';

export function closeModal() {
	return {
		type: CLOSE_MODAL,
	};
}
export function chooseStore(location) {
	return {
		type: CHOOSE_STORE,
		payload: {
			store: location,
		},
	};
}

export function changeLang(lang) {
	return {
		type: CHANGE_LANG,
		payload: {
			lang,
		},
	};
}
