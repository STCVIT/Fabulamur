import React, { useState } from "react";
import Draggable from "react-draggable"; // To make the Pop-up draggable accross the screen
import { ModalContext } from "../contexts/NewModal";
import socket from "./Socket/Socket";
import "./PopUp.css";

import { Link } from "react-chrome-extension-router";

import Choose from "./Choose/Choose";

import closeIcon from "../icons/fi_x.png";
import logo from "../icons/logo.png";
import PalleteIcon from "../icons/carbon_color-palette.png";
import home from "../icons/fi_home.png";

import { Router } from "react-chrome-extension-router";
import Pallete from "./Pallete/Pallete";

const PopUp = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [showPallete, setShowPallete] = useState(false);
  const disconnect = () => {
    socket.disconnect();
    socket.connect();
  };
  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition }) => (
        <Draggable
          handle="#modal"
          defaultPosition={{ x: windowPosition.x, y: windowPosition.y }}
          position={
            hasDraggedWindowPosition
              ? { x: windowPosition.x, y: windowPosition.y }
              : null
          }
        >
          <div
            id="modal"
            style={{
              transform: windowPosition,
            }}
          >
            <div className="modal-window-inner-border">
              <>
                <div className="modal-body">
                  <div className="modalHeader">
                    <div className={`${showPopup ? "maxHeader" : "stopExt"}`}>
                      <Link component={Choose}>
                        <img src={home} alt="home" onClick={disconnect} />
                      </Link>
                      <div className="modalCompanyName">
                        <div className="innerDiv">
                          <div className="modalTitle">Fabulamur</div>{" "}
                          <div className="closeModalIcon">
                            <div className="pallete">
                              <img
                                src={PalleteIcon}
                                alt="close icon"
                                className="icons"
                                style={{
                                  marginRight: "5px",
                                }}
                                onClick={() => {
                                  setShowPallete(!showPallete);
                                }}
                              />
                              {showPallete && <Pallete />}
                            </div>
                            <img
                              src={closeIcon}
                              alt="close icon"
                              className="icons"
                              onClick={() => setShowPopup(false)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${showPopup ? "noBubble" : "bubble"}`}
                      onClick={() => setShowPopup(true)}
                    >
                      <img className="fabulamur_logo" src={logo}></img>
                    </div>
                  </div>
                  {/* Routing to defferent pages inside the pop-up */}
                  <div className={`${showPopup ? "" : "stopExt"}`}>
                    <Router>
                      <Choose />
                    </Router>
                  </div>
                </div>
              </>
            </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default PopUp;
