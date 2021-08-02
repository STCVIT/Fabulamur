import { io } from "socket.io-client";

var socket = io("https://fabulamur.herokuapp.com", {
  transports: ["websocket", "polling", "flashsocket"],
});

export default socket;
