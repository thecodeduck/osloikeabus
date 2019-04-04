const initalModalState = {
	shown: false,
	text: 'Something went wrong',
	action: 'closeModal',
};

export default function modalReducer(state = initalModalState, { type, payload }) {
	const newState = {
		shown: true,
		text: payload.text,
		action: type,
	};
	switch (type) {
		case 'newRound': {
			return newState;
		}
		case 'endGame': {
			return newState;
		}
		default:
			return state;
	}
}
