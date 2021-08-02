export const initialState = {
	username: "",
	roomCode: "",
	url: "",
	sticker: "",
	replyTo: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_DETAILS":
			return {
				...state,
				user: action.user,
				roomCode: action.roomCode,
				url: action.url,
			};
		case "SET_REPLYTO":
			return {
				...state,
				replyTo: action.replyTo,
			};
		case "SET_REPLIEDMESSAGE":
			return {
				...state,
				repliedMessage: action.repliedMessage,
			};
		case "SET_REPLIEDMESSAGENAME":
			return {
				...state,
				repliedMessageName: action.repliedMessageName,
			};
		case "SET_MESSAGETYPE":
			return {
				...state,
				messageType: action.messageType,
			};
		default:
			return state;
	}
};

export default reducer;
