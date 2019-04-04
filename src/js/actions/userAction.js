export const CLOSE_MODAL = 'user:closeModal';
export const CHOOSE_STORE = 'user:chooseStore';

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
