import React, { useState, createContext } from "react";
export const ChatContext = createContext({ user: null, chatId: "" });
export default (props) => {
  const [chatDetails, setChatDetails] = useState({ user: null, chatId: "" });
  return (
    <ChatContext.Provider value={{ chatDetails, setChatDetails }}>
      {props.children}
    </ChatContext.Provider>
  );
};
