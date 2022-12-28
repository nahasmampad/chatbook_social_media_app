import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function ChatOnline({ onlineUsers, user, friends,getFriends }) {
  
  const [onlinefriends, setOnlineFriends] = useState([]);
  const createChat = async (reciverId)=>{
    const datas ={
      senderId: user.id,
      reciverId:reciverId
    }

  
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createChate`,
      datas,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    console.log('res->', data);


  }

  

  useEffect(() => {
    getFriends();
  }, [user.id]);

  console.log("friends->", friends);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log('onfri->', onlinefriends);

  return (
    <div className="ChatOnline">
      <span>Friends</span>
      {friends.map((onf, i) => (
        <div className="chatOnline_friends hover1" onClick={()=>{createChat(onf._id)}}>
          <div className="co_img_container">
            <img className="chat_msg_img" src={onf.picture} alt="" />
            {/* <div className="chatOnline_badge"></div> */}
            <span>{onf.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
