import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import Chat from "../Chat/Chat";
import { ChatContext } from "../useChatProvider";
function ChatContainer() {
  const { chatDetails } = useContext(ChatContext);
  const [chat, setChat] = useState();
  const [messages, setMessages] = useState();
  useEffect(() => {
    const getMessages = async () => {
        const ref = db.collection("chats").doc(chatDetails?.chatId);
        const messagesRes = await ref
          .collection("messages")
          .orderBy("timestamp", "asc")
          .get();
        const messages = messagesRes.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime(),
          }));
        const chatRes = await ref.get();
        const chat = {
          id: chatRes.id,
          ...chatRes.data(),
        };
        console.log(messages, chat, "messages chat");
        setMessages(messages);
        setChat(chat);
    };  
    if (chatDetails?.chatId) {
      getMessages();
    }
  }, [chatDetails?.chatId]);
  return (
    <div style={{width: '100%', height: '100%'}}>
      {chatDetails?.chatId && <Chat messages={messages || []} chat={chat}/>}
    </div>
  );
}

export default ChatContainer;
