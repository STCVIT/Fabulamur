import { io } from "socket.io-client";

var socket = io("https://flabumar.herokuapp.com", {
	transports: ["websocket", "polling", "flashsocket"],
});

export default socket;
