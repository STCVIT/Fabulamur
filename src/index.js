import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer, { initialState } from "./components/Reducer/reducer";
import { StateProvider } from "./contexts/UserDetails";

ReactDOM.render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById("modal-window"),
);
