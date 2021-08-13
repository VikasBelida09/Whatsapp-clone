import React, { useEffect } from "react";
import classes from "./sidebarChat.module.css";
import { Avatar } from "@material-ui/core";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import { UserContext } from "../useProvider";
import { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../useChatProvider";
function SidebarChat({ id, users }) {
  const user = useContext(UserContext);
  const { setChatDetails, chatDetails } = useContext(ChatContext);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapShot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapShot?.docs?.[0]?.data?.();
  const createChat = () => {
    setChatDetails({
      ...chatDetails,
      chatId: id,
      user: user,
      recipientUser:recipient
    });
    console.log('email',recipient?.email);
    db.collection("users").doc(user.uid).set(
      {
        activeChat:recipient?.email || 'none'
      },
      { merge: true }
    );
  };

  return (
    <div className={classes.sidebarChat} onClick={createChat}>
      {recipient ? <Avatar src={recipient?.photoURL} /> : <Avatar />}

      <div className={classes.sidebarChat__info}>
        <h2 className={classes.sidebarChat__name}>{recipientEmail}</h2>
      </div>
    </div>
  );
}

export default SidebarChat;
