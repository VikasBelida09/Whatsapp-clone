import React, { useContext } from "react";
import { UserContext } from "../useProvider";
import classes from "./Message.module.css";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { ChatContext } from "../useChatProvider";
function Message({ user, message,isActiveChat }) {
    console.log('user from messages',user,isActiveChat)
  const userLogged = useContext(UserContext);
  const typeOfMessage = user === userLogged.email ? "sender" : "reciever";
  return (
    <div className={classes.message__container}>
      <p
        className={
          typeOfMessage === "sender" ? classes.sender : classes.reciever
        }
      >
        {message.message}
        {typeOfMessage === "sender" && (
          <span>
            <DoneAllIcon style={{height:'10',width:'10',color:(message.seen || isActiveChat)?'blue':''}}/>
          </span>
        )}
      </p>
    </div>
  );
}

export default Message;
