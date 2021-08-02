import React, { useState } from "react";
import { Link } from "react-chrome-extension-router";

import Join from "../Join/Join";

export default function Choose() {
	const [isPublic, setIsPublic] = useState(true);
	const [create, setCreate] = useState(true);
	return (
		<div className="chooseOuterContainer">
			<div className="chooseInnerContainer">
				<h2 className="chooseHeading">Choose the type of room</h2>
				<Link component={Join} props={{ create }}>
					<button placeholder="Name" className="publicButton">
						Create
					</button>
				</Link>
				<Link component={Join}>
					<button placeholder="Name" className="privateButton">
						Join
					</button>
				</Link>
			</div>
		</div>
	);
}
