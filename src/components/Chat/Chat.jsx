import React, { useState, useRef, useEffect, useContext } from "react";
import classes from "./chat.module.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import { AttachFile, InsertEmoticon } from "@material-ui/icons";
import cx from "classnames";
import { UserContext } from "../useProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../useChatProvider";
import Message from "../Message/Message";
import firebase from "firebase";
import TimeAgo from "timeago-react";
const Chat = ({ messages, chat }) => {
  const user = useContext(UserContext);
  const { chatDetails } = useContext(ChatContext);
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(chatDetails?.chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", chatDetails?.recipientUser?.email || "")
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data?.();
  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          isActiveChat={recipient?.activeChat===user?.email}
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };
  const [input, setInput] = useState("");
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    db.collection("chats")
      .doc(chatDetails.chatId)
      .collection("messages")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            seen:true,
          });
        });
      });
  }, [chatDetails?.chatId]);
  const messageEnd = useRef(null);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(chatDetails.chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };
  const scrollToBottom = () => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={classes.chat}>
      <div className={classes.chat__header}>
        <Avatar src={chatDetails?.recipientUser?.photoURL} />
        <div className={classes.chat__headerInfo}>
          <h3>
            {chatDetails?.recipientUser?.email?.split("@")[0] || "Unknown user"}
          </h3>
          <p>
            Last active at:{" "}
            {recipient?.lastSeen?.toDate() ? (
              <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
            ) : (
              "Unavailable"
            )}
          </p>
        </div>
        <div className={classes.chat__headerRight}>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.chat__body}>
        {showMessages()}
        <div ref={messageEnd}></div>
      </div>
      <div className={classes.chat__footer}>
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="Type a Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
