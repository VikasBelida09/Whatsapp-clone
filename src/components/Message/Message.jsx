import React, { useContext } from "react";
import { UserContext } from "../useProvider";
import classes from "./Message.module.css";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { ChatContext } from "../useChatProvider";
import CheckIcon from "@material-ui/icons/Check";
function Message({ user, message, isActiveChat, isOffline }) {
  console.log("user from messages", user, isActiveChat);
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
        {typeOfMessage === "sender" && !isOffline ? (
          <span>
            <DoneAllIcon
              style={{
                height: "10",
                width: "10",
                color: message.seen || isActiveChat ? "blue" : "",
              }}
            />
          </span>
        ) : (
          typeOfMessage === "sender" && (
            <span>
              <CheckIcon style={{ height: "10", width: "10" }} />
            </span>
          )
        )}
      </p>
    </div>
  );
}

export default Message;
