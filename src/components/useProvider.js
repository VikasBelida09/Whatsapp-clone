import React, { useState, useEffect, createContext } from "react";
import { auth } from "../firebase";
export const UserContext = createContext({ user: null });
export default (props) => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        console.log(user);
        setuser({
          displayName,
          email,
          uid,
          photoURL,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ displayName, email, uid, photoURL })
        );
      }
    });
  }, []);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
