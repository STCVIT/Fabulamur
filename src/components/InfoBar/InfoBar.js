import React from "react";
import { Link } from "react-chrome-extension-router";
import { useStateValue } from "../../contexts/UserDetails";
import home from "../../icons/fi_home.png";
import Choose from "../Choose/Choose";
import "./InfoBar.css";
import socket from "../Socket/Socket";

function InfoBar() {
	const [{ roomCode }, dispatch] = useStateValue();
	const disconnect = () => {
		socket.disconnect();
		socket.connect();
	};
	return (
		<div className="infoBar" id="infoBar">
			<div className="leftInnerContainer">
				<h3>Room: {roomCode ? roomCode : "Public"}</h3>
			</div>
			<div className="rightInnerContainer">
				{/* <div onClick={() => setShowModal(!showModal)}>
        <img className="usersIconDiv" src={users} alt="users" />
      </div> */}
				<Link component={Choose}>
					<img src={home} alt="home" onClick={disconnect} />
				</Link>
			</div>
		</div>
	);
}

export default InfoBar;
