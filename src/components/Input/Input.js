import React, { useEffect, useState } from "react";
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react"; // To add emojis in the message

import "./Input.css";

import clip from "../../icons/Vector.png";
import stickerIcon from "../../icons/Frame.png";
import emoji from "../../icons/fi_meh.png";
import sendIcon from "../../icons/fi_arrow-up-right (1).png";
import axios from "axios";
import socket from "../Socket/Socket";
import { useStateValue } from "../../contexts/UserDetails";
import stickerData from "../stickerData/sticker.json";

const Input = () => {
  const [
    {
      user,
      roomCode,
      url,
      replyTo,
      repliedMessage,
      repliedMessageName,
      messageType,
    },
    dispatch,
  ] = useStateValue();
  const [showEmojiDiv, setShowEmojiDiv] = useState(false);
  const [showStickerDiv, setShowStickerDiv] = useState(false);
  const [getStickers, setGetStickers] = useState([]);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const sendSticker = (sticker) => {
    const stickerArray = sticker.split("/");
    const stickerMessage = stickerArray[stickerArray.length - 1];
    const id = socket.id;
    const type = "image";
    socket.emit("sendMessage", { user, id, message: stickerMessage, type });
  };

  const loadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const id = socket.id;
    console.log(e.target.files[0]);
    formData.append("image", e.target.files[0]);
    formData.append("user", user);
    formData.append("roomcode", roomCode);
    formData.append("url", url);
    formData.append("id", id);
    axios.post("https://flabumar.herokuapp.com/upload", formData);
    const type = "image";
    socket.emit("sendMessage", { user, id, message, type });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (replyTo) {
      const id = socket.id;
      const type = messageType;
      socket.emit("sendMessage", {
        user,
        id,
        message,
        type,
        replyTo,
        repliedMessage,
        repliedMessageName,
      });
    }
    if (message != "") {
      const id = socket.id;
      const repliedMessage = null;
      const type = "text";
      socket.emit("sendMessage", {
        user,
        id,
        message,
        type,
        replyTo,
        repliedMessage,
      });
      document.getElementById("message").value = "";
      setMessage("");
    }
    dispatch({
      type: "SET_REPLYTO",
      replyTo: false,
    });
  };

  const setStickerDiv = () => {
    setShowStickerDiv(!showStickerDiv);
  };
  useEffect(() => {
    axios.get("https://flabumar.herokuapp.com/getStickers").then((response) => {
      response.data.forEach((sticker) => {
        setGetStickers((prevSticker) => [...prevSticker, sticker]);
      });
    });
  }, []);
  return (
    <div>
      <div>
        {/* Pops up a div to show the emoji selection box */}
        <div className={`${showEmojiDiv ? "emojiPickerDiv" : "no"}`}>
          <Picker
            onEmojiClick={onEmojiClick}
            skinTone={SKIN_TONE_NEUTRAL}
            pickerStyle={{ width: "100%" }}
          />
        </div>
        {/* Input field for the user to input their message */}
        {replyTo && (
          <div className="replyToDiv">
            {messageType == "text" && (
              <div className="replyToInnerDiv">
                <p className="replyToInputDiv">{repliedMessage}</p>
              </div>
            )}
            {messageType == "image" && (
              <div className="replyToInnerDiv">
                <img
                  src={`https://flabumar.herokuapp.com/${repliedMessage}`}
                  className="repliedToSticker"
                />
              </div>
            )}
            {messageType == "file" && (
              <div className="replyToInnerDiv">
                <p className="replyToInputDiv">{"File"}</p>
              </div>
            )}
          </div>
        )}
        <form className="form">
          <img
            onClick={() => setShowEmojiDiv(!showEmojiDiv)}
            className="inputIcons inputEmoji"
            src={emoji}
            alt="emoji"
            style={{ cursor: "pointer" }}
          />
          <img
            onClick={setStickerDiv}
            className="inputIcons inputEmoji"
            src={stickerIcon}
            alt="stickerIcon"
            style={{ cursor: "pointer", marginLeft: "6px", marginRight: "6px" }}
          />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={loadFile}
          ></input>
          <label for="file">
            <img
              className="inputIcons"
              src={clip}
              alt="attach"
              style={{ cursor: "pointer" }}
            />
          </label>
          <input
            className="chatInput"
            type="text"
            id="message"
            autoComplete="off"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendIcon" onClick={sendMessage}>
            <img src={sendIcon} className="sendIconImage" alt="send" />
          </button>
        </form>
      </div>
      {showStickerDiv && (
        <div className="stickers">
          {getStickers.map((sticker) => {
            return (
              <img
                className="stickerDiv"
                src={`https://flabumar.herokuapp.com/${sticker}`}
                onClick={() => {
                  sendSticker(sticker);
                }}
                style={{ cursor: "pointer" }}
                alt="sticker"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Input;
