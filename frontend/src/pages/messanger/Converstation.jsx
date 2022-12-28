import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Converstation({ conversation, currUser }) {
  
  const [user, setUser] = useState(null);
  const getUser = async (friendsId) => {
    try {
      
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getUser/${friendsId}`,
        {
          headers: {
            Authorization: `Bearer ${currUser.token}`,
          },
        }
      );

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    const friendsId = conversation.members.find((m) => m !== currUser.id);
    getUser(friendsId);
  }, [currUser, conversation]);
  return (
    <div className="conversation">
      <div className="con_wraper hover2">
        <img
          className="conversation_img"
          src={
            user?.picture
          }
          alt=""
        />
        <span>{user?.username}</span>
      </div>
    </div>
  );
}

export default Converstation;
