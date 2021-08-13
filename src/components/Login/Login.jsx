import React, { useContext, useEffect, useRef } from "react";
import { auth, db, provider } from "../../firebase";
import Chat from "../Chat/Chat";
import SideBar from "../sideBar/sideBar";
import { UserContext } from "../useProvider";
import classes from "./login.module.css";
import firebase from "firebase";
import ChatProvider from "../useChatProvider";
import ChatContainer from "../ChatContainer/ChatContainer";
import { Prompt } from "react-router-dom";
function Login() {
  const user = useContext(UserContext);
  const latestUser = useRef(user);
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  useEffect(() => {
    const setStatusAndActiveUser = () => {
      let u=JSON.parse(localStorage.getItem('user'));
      console.log(u,'u');
      db.collection("users").doc(u?.uid).set(
        {
          activeChat: "none",
          status: "offline",
        },
        { merge: true }
      ).then((e)=>{
        console.log('updated');
      })
    };
    window.onbeforeunload=(e)=>setStatusAndActiveUser();
    window.onunload=(e)=>setStatusAndActiveUser();
    return () => {
      window.onbeforeunload=null;
      window.onunload=null;
    };
  },[]);
  const RPrompt=<Prompt message={"Are you sure?"}/>
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          photoURL: user.photoURL,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          status: "online",
        },
        { merge: true }
      );
    }
  }, [user]);
  if (!user)
    return (
      <div className={classes.login__container}>
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
          className={classes.logo}
        />
        <button onClick={signIn} className={classes.google__button}>
          SIGN IN WITH GOOGLE
        </button>
      </div>
    );
  return (
    <div className="app__body">
      <ChatProvider>
        <SideBar />
        <ChatContainer />
        {RPrompt}
      </ChatProvider>
    </div>
  );
}
export default Login;
