import React, { useState } from "react";
import { Link } from "react-chrome-extension-router";

import "./Choose.css";

import Join from "../Join/Join";
import CreateJoin from "../CreateJoin/CreateJoin";

export default function Choose() {
  const [isPublic, setIsPublic] = useState(true);
  return (
    <div className="chooseOuterContainer">
      <div className="chooseInnerContainer">
        <h2 className="chooseHeading">Choose the type of room</h2>
        <Link component={Join} props={{ isPublic: isPublic }}>
          <button placeholder="Name" className="publicButton">
            Public Room
          </button>
        </Link>
        <Link component={CreateJoin}>
          <button placeholder="Name" className="privateButton">
            Private Room
          </button>
        </Link>
      </div>
    </div>
  );
}
