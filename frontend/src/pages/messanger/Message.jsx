import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { format } from "timeago.js";

function Message({ message, own, currentChat, user,friend,setFriend }) {
  
  const friendsId = currentChat.members.find((m) => m !== user.id);
  const getUser = async (friendsId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getUser/${friendsId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setFriend(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("friendchat->", friend);

  useEffect(() => {
    getUser(friendsId);
  }, [friendsId]);

  console.log(friendsId, "m-<");
  return (
    <>
      
      <div className={own ? "chat_message own" : "chat_message"}>
        <div className="chat_message_top">
          <img
            className="chat_msg_img"
            src={own ? user?.picture : friend?.picture}
            alt=""
          />
          <p className="message_text">{message.text}</p>
        </div>
        <div className="chat_message_bottom">{format(message.createdAt)}</div>
      </div>
    </>
  );
}

export default Message;
