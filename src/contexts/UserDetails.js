import React, { createContext, useContext, useReducer } from "react";

// Prepares the data layer
export const DetailsContext = createContext();

// Wraps the app and Provides the data Layer to componenets
export const StateProvider = ({ reducer, initialState, children }) => (
	<DetailsContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</DetailsContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(DetailsContext);
