import React from "react";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h3>People currently chatting:</h3>
      <div className="activeContainer">
        <h5>
          {users.map(({ name }) => (
            <div key={name} className="activeItem">
              {name}
            </div>
          ))}
        </h5>
      </div>
    </div>
  </div>
);

export default TextContainer;
