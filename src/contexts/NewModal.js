import React from "react";
import getWindowPositon from "../hooks/getWindowPosition";

export const ModalContext = React.createContext({});

const NewModal = ({ children }) => {
  const { windowPosition } = getWindowPositon();
  return (
    <ModalContext.Provider
      value={{
        windowPosition,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default NewModal;
