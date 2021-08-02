import React, { useState } from "react";

// import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

const Chat = ({ room }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  console.log(room);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar
          room={room}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} />
      </div>
      <div className={`ab ${showModal ? "" : "no"}`}>
        {/* <TextContainer users={users} /> */}
      </div>
    </div>
  );
};

export default Chat;
