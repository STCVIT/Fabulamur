import React from "react";
import "./Pallete.css";

function Pallete() {
	const setTheme = (color) => {
		document.documentElement.style.setProperty(
			"--background-color",
			`#${color}`,
		);
	};
	return (
		<div className="palleteDiv">
			<div className="backgroundColors">
				<div className="palleteTitle">Background Colors:</div>
				<div className="color">
					<div
						className="peach circle"
						onClick={() => setTheme("fdb99b")}
					></div>
					<div
						className="darkpeach circle"
						onClick={() => setTheme("e56868")}
					></div>
					<div className="blue circle" onClick={() => setTheme("2f80ed")}></div>
					<div
						className="purple circle"
						onClick={() => setTheme("bb6bd9")}
					></div>
					<div
						className="golden circle"
						onClick={() => setTheme("ffb347")}
					></div>
					<div
						className="darkGreen circle"
						onClick={() => setTheme("4fb779")}
					></div>
					<div
						className="peach circle"
						onClick={() => setTheme("fdb99b")}
					></div>
					<div
						className="darkpeach circle"
						onClick={() => setTheme("e56868")}
					></div>
					<div className="blue circle" onClick={() => setTheme("2f80ed")}></div>
					<div
						className="purple circle"
						onClick={() => setTheme("bb6bd9")}
					></div>
				</div>
			</div>
		</div>
	);
}

export default Pallete;
