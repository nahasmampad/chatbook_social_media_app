import "./Messanger.css";
import Header from "../../components/header";
import Converstation from "./Converstation";
import Message from "./Message";
import sendIcon from "../../svg/send-fill.svg";
import ChatOnline from "./ChatOnline";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";

function Messanger() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentchat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [friend, setFriend] = useState("");
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:8900"));
  const getCoversation = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/createChate/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setConversation(data.conversation);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/message/${currentChat._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setMessages(data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  //getFriends

  const getFriends = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getFriends/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    console.log("friends->", friends);
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      console.log(users, "soket");
      setOnlineUsers(
        friends.filter((f) => users.some((u) => u.userId === f._id))
      );
    });
  }, [user]);

  useEffect(() => {
    getCoversation();
  }, [user.id]);

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const reciverId = currentChat?.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      reciverId,
      text: newMessage,
    });

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/message`,
        message,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setMessages([...messages, data.saveMessage]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header />
      <div className="messanger">
        <div className="chatMenu">
          <div className="chatMenu_wrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenu_input"
            />
            {conversation &&
              conversation.length &&
              conversation.map((con, i) => (
                <div onClick={() => setCurrentchat(con)}>
                  <Converstation key={i} conversation={con} currUser={user} />
                </div>
              ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBox_wrapper">
            {currentChat ? (
              <>
                <div className="chat_nameBar">
                  <img
                    className="conversation_img"
                    src={friend?.picture}
                    alt=""
                  />
                  <div className="chat_namebar_name">{friend?.username}</div>
                </div>
                <div className="chatBox_top scrollbar">
                  {messages &&
                    messages.length &&
                    messages.map((mes, i) => (
                      <div ref={scrollRef}>
                        <Message
                          key={i}
                          user={user}
                          message={mes}
                          currentChat={currentChat}
                          own={mes.sender === user.id}
                          friend={friend}
                          setFriend={setFriend}
                        />
                      </div>
                    ))}
                </div>
                <div className="chatBox_bottom">
                  <div className="chat_message_input">
                    <input
                      type="text"
                      placeholder="Message"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    />
                    <button className="chat_send_btn" onClick={handleSubmit}>
                      <img src={sendIcon} alt="" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <span>Open a conversation to start a chat</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnline_wrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              user={user}
              friends={friends}
              getFriends={getFriends}
              setCurrentchat={setCurrentchat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messanger;
