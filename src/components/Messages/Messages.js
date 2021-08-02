import React, { useEffect, useState } from "react";

import ScrollToBottom from "react-scroll-to-bottom";

// import Penguid from "../../icons/penguid.jpg";

import "./Message.css";
import socket from "../Socket/Socket";
import { useStateValue } from "../../contexts/UserDetails";
import replyIcon from "../../icons/reply icon (1).png";
import download from "../../icons/Vector (1).png";
import { render } from "react-dom";

class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
}

class Message {
  constructor(message, type, replyTo, repliedMessage, repliedMessageName) {
    this.message = message;
    this.type = type;
    this.replyTo = replyTo;
    this.repliedMessage = repliedMessage;
    this.repliedMessageName = repliedMessageName;
  }
}

class MessageGroup {
  messages = [];

  constructor(sender, message) {
    this.sender = sender;
    this.messages.push(message);
  }
  addMessage(message) {
    this.messages.push(message);
  }
}

function endsWithAny(suffixes, string) {
  for (let suffix of suffixes) {
    if (string.endsWith(suffix)) return true;
  }
  return false;
}

const me = new User(socket.id, "test");

const Messages = ({ messages, name }) => {
  const [messageGroups, setMessageGroups] = useState([]);
  const [replyToMessage, setReplyToMessage] = useState("");
  const [{ replyTo }, dispatch] = useStateValue();
  const replyToFunction = (message, name, messageType) => {
    console.log(messageType);
    dispatch({
      type: "SET_REPLYTO",
      replyTo: true,
    });
    dispatch({
      type: "SET_REPLIEDMESSAGE",
      repliedMessage: message,
    });
    dispatch({
      type: "SET_REPLIEDMESSAGENAME",
      repliedMessageName: name,
    });
    dispatch({
      type: "SET_MESSAGETYPE",
      messageType,
    });
  };

  useState(() => {
    console.log("socket connected");
    socket.on(
      "recieveMessage",
      ({
        message,
        type,
        id,
        user,
        replyTo,
        repliedMessage,
        repliedMessageName,
      }) => {
        if (message != null) {
          const newMessage = new Message(
            message,
            type,
            replyTo,
            repliedMessage,
            repliedMessageName
          );
          const sender = new User(id, user);
          setMessageGroups((messageGroups) => {
            const messageGroup = new MessageGroup(sender, newMessage);
            return [...messageGroups, messageGroup];
          });
        }
      },
      [socket]
    );
  });

  return (
    <div className="bg">
      <ScrollToBottom className="messages">
        <div className="bg">
          {messageGroups.map((data) => {
            if (data.sender.id == socket.id) {
              if (
                data.messages[0].type == "text" &&
                data.messages[0].replyTo != true
              ) {
                return (
                  <div
                    className="messageContainer justifyEnd"
                    onClick={replyTo}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="replyIcon"
                      onClick={() =>
                        replyToFunction(
                          data.messages[0].message,
                          data.sender.username,
                          data.messages[0].type
                        )
                      }
                    >
                      <img src={replyIcon} className="replyIcon" />
                    </div>
                    <div className="messageBox backgroundBlue right-top">
                      <p className="messageText colorWhite">
                        {data.messages[0].message}
                      </p>
                      <div className="timestamp">
                        <small className="time">
                          {new Date().getHours() +
                            ":" +
                            new Date().getMinutes()}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type == "text" &&
                data.messages[0].replyTo == true &&
                data.messages[0].repliedMessage
              ) {
                console.log(data);
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue  right-top">
                      <div className="repliedMessage">
                        <p className="repliedName">
                          {data.messages[0].repliedMessageName}
                        </p>
                        <p className="repliedText">
                          {data.messages[0].repliedMessage}
                        </p>
                      </div>
                      <p className="messageText colorWhite">
                        {data.messages[0].message}
                      </p>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type === "file" &&
                endsWithAny(
                  [".pdf", ".docx", ".txt", ".ppt", ".pptx", ".doc"],
                  data.messages[0].message
                )
              ) {
                return (
                  <div className="messageContainer justifyEnd">
                    <div
                      className="replyIcon"
                      onClick={() =>
                        replyToFunction(
                          data.messages[0].message,
                          data.sender.username,
                          data.messages[0].type
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <img src={replyIcon} className="replyIcon" />
                    </div>
                    <div className="messageBox backgroundBlue tri-right right-top">
                      <p
                        className="messageText colorWhite"
                        style={{ display: "flex" }}
                      >
                        <div className="downloadDiv">
                          <img
                            src={download}
                            alt="downloadIcon"
                            className="downloadIcon"
                          />
                        </div>
                        <div>
                          <a
                            className="messageText colorWhite"
                            href={`https://flabumar.herokuapp.com/${data.messages[0].message}`}
                            target="blank"
                          >
                            File
                          </a>
                        </div>
                      </p>
                      <div className="timestamp">
                        <small className="time">
                          {new Date().getHours() +
                            ":" +
                            new Date().getMinutes()}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type === "image" &&
                endsWithAny([".png", ".jpg", ".jpeg"], data.messages[0].message)
              ) {
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="stickerReply">
                      <img
                        src={replyIcon}
                        className="replyIcon"
                        onClick={() =>
                          replyToFunction(
                            data.messages[0].message,
                            data.sender.username,
                            data.messages[0].type
                          )
                        }
                      />
                    </div>
                    <div className="messageBox backgroundBlue tri-right right-top">
                      <p className="messageText colorWhite">
                        <img
                          className="sentImage"
                          src={`https://flabumar.herokuapp.com/${data.messages[0].message}`}
                          alt="image"
                        />
                      </p>
                      <div className="timestamp">
                        <small className="time">
                          {new Date().getHours() +
                            ":" +
                            new Date().getMinutes()}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type == "file" &&
                data.messages[0].replyTo &&
                data.messages[0].repliedMessage
              ) {
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue  right-top">
                      <div className="repliedMessage">
                        <p className="repliedName">
                          {data.messages[0].repliedMessageName}
                        </p>
                        <p className="repliedText">{"File  "}</p>
                      </div>
                      <p className="messageText colorWhite">
                        {data.messages[0].message}
                      </p>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type == "image" &&
                data.messages[0].replyTo &&
                data.messages[0].repliedMessage
              ) {
                console.log(data);
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue  right-top">
                      <div className="repliedMessage">
                        <img
                          src={`https://flabumar.herokuapp.com/${data.messages[0].repliedMessage}`}
                          className="sentSticker"
                        />
                      </div>
                      <p className="messageText colorWhite">
                        {data.messages[0].message}
                      </p>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type === "image" &&
                endsWithAny([".webp"], data.messages[0].message)
              ) {
                return (
                  <div className="messageContainer justifyEnd stickerMessageSent">
                    <div style={{ display: "flex" }}>
                      <div className="stickerReply">
                        <img
                          src={replyIcon}
                          className="replyIcon"
                          onClick={() =>
                            replyToFunction(
                              data.messages[0].message,
                              data.sender.username,
                              data.messages[0].type
                            )
                          }
                        />
                      </div>
                      <div>
                        <p className="messageText colorWhite">
                          <img
                            className="sentSticker"
                            src={`https://flabumar.herokuapp.com/${data.messages[0].message}`}
                            alt="image"
                            style={{ objectFit: "cover" }}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="stickerTimeStamp">
                      <small className="time">
                        {new Date().getHours() + ":" + new Date().getMinutes()}
                      </small>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type === "image" &&
                endsWithAny([".mp4", ".mov", ".wmv"], data.messages[0].message)
              ) {
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue tri-right right-top">
                      <p className="messageText colorWhite">
                        <video width="200" height="120" controls>
                          <source
                            src={`https://flabumar.herokuapp.com/${data.messages[0].message}`}
                            type="video/mp4"
                          />
                        </video>
                      </p>
                      <div className="timestamp">
                        <small className="time">
                          {new Date().getHours() +
                            ":" +
                            new Date().getMinutes()}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              }
            } else if (
              data.messages[0].type == "text" &&
              !data.messages[0].replyTo
            ) {
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen tri-right left-top">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p className="messageText colorWhite">
                      {data.messages[0].message}
                    </p>
                    <div className="timestamp">
                      <small className="time">
                        {new Date().getHours() + ":" + new Date().getMinutes()}
                      </small>
                    </div>
                  </div>
                  <div className="replyIconDiv">
                    <img
                      src={replyIcon}
                      className="sentReplyIcon"
                      onClick={() =>
                        replyToFunction(
                          data.messages[0].message,
                          data.sender.useranme,
                          data.messages[0].type
                        )
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              );
            } else if (
              data.messages[0].type == "text" &&
              data.messages[0].replyTo &&
              data.messages[0].repliedMessage
            ) {
              console.log(data);
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p className="senderRepliedTo">
                      {data.messages[0].repliedMessage}
                    </p>
                    <p className="senderMessage">{data.messages[0].message}</p>
                    <div className="timestamp">
                      <small className="time">
                        {new Date().getHours() + ":" + new Date().getMinutes()}
                      </small>
                    </div>
                  </div>
                </div>
              );
            } else if (
              data.messages[0].type === "file" &&
              endsWithAny(
                [".pdf", ".docx", ".txt", ".ppt", ".pptx", ".doc"],
                data.messages[0].message
              )
            ) {
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p
                      className="messageText colorWhite"
                      style={{ display: "flex" }}
                    >
                      <div className="downloadDiv">
                        <img
                          src={download}
                          alt="downloadIcon"
                          className="downloadIcon"
                        />
                      </div>
                      <div>
                        <a
                          href={`https://flabumar.herokuapp.com/${data.messages[0].message}`}
                          target="blank"
                          className="messageText colorWhite"
                        >
                          File
                        </a>
                      </div>
                    </p>
                    <div className="timestamp">
                      <small className="time">
                        {new Date().getHours() + ":" + new Date().getMinutes()}
                      </small>
                    </div>
                  </div>
                  <div className="replyIconDiv">
                    <img
                      src={replyIcon}
                      className="sentReplyIcon"
                      onClick={() =>
                        replyToFunction(
                          data.messages[0].message,
                          data.sender.useranme,
                          data.messages[0].type
                        )
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              );
            } else if (
              data.messages[0].type == "image" &&
              endsWithAny([".webp"], data.messages[0].message)
            ) {
              return (
                <div className="justifyStart stickerMessage">
                  <div className="stickerBox backgroundGreen">
                    <small className="sentText">{data.sender.username}</small>
                  </div>
                  <p className="messageText colorWhite flex">
                    <img
                      className="sentImage"
                      src={`https://flabumar.herokuapp.com/${data.messages[0].message}`}
                      alt="image"
                    />
                    <div className="replyIconDiv">
                      <img
                        src={replyIcon}
                        className="sentReplyIcon"
                        onClick={() =>
                          replyToFunction(
                            data.messages[0].message,
                            data.sender.useranme,
                            data.messages[0].type
                          )
                        }
                        style={{ cursor: "pointer", marginLeft: "35px" }}
                      />
                    </div>
                  </p>

                  <div className="stickerTimeStamp">
                    <small className="time">
                      {new Date().getHours() + ":" + new Date().getMinutes()}
                    </small>
                  </div>
                </div>
              );
            } else if (
              data.messages[0].type == "image" &&
              endsWithAny(
                [".png", ".jpg", ".jpeg", ".gif"],
                data.messages[0].message
              )
            ) {
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p className="messageText colorWhite flex">
                      <img
                        className="sentImage"
                        src={`https://flabumar.herokuapp.com/${data.messages[0].message}`}
                        alt="image"
                      />
                      <div className="replyIconDiv">
                        <img
                          src={replyIcon}
                          className="sentReplyIcon"
                          onClick={() =>
                            replyToFunction(
                              data.messages[0].message,
                              data.sender.useranme,
                              data.messages[0].type
                            )
                          }
                          style={{ cursor: "pointer", marginLeft: "65px" }}
                        />
                      </div>
                    </p>
                    <div className="timestamp">
                      <small className="time">
                        {new Date().getHours() + ":" + new Date().getMinutes()}
                      </small>
                    </div>
                  </div>
                </div>
              );
            } else if (
              data.messages[0].type === "image" &&
              endsWithAny([".mp4", ".mov", ".wmv"], data.messages[0].message)
            ) {
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p className="messageText colorWhite">
                      <video width="200" height="120" controls>
                        <source
                          src={`https://flabumar.herokuapp.com/${data.messages[0].message}`}
                          type="video/mp4"
                        />
                      </video>
                    </p>
                    <div className="timestamp">
                      <small className="time">
                        {new Date().getHours() + ":" + new Date().getMinutes()}
                      </small>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
