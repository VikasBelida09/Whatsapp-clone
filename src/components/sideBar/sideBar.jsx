import React, { useState, useContext } from "react";
import classes from "./sidebar.module.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton, withStyles } from "@material-ui/core";
import SidebarChat from "../SideBarChat/SidebarChat";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import FormDialog from "../dialog/dialog";
import PeopleIcon from "@material-ui/icons/People";
import Badge from "@material-ui/core/Badge";
import ViewFriends from "../dialog/viewFriendsDialog";
import { db } from "../../firebase";
import { UserContext } from "../useProvider";
import { useCollection } from "react-firebase-hooks/firestore";
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -5,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
const SideBar = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [addUserEmail, setAddUserEmail] = useState("");
  const user = useContext(UserContext);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapShot] = useCollection(userChatRef);
  const textChange = (val) => {
    setAddUserEmail(val);
    if (val !== user.email && !chatAlreadyExists(val)) {
      db.collection("chats").add({
        users: [user.email, val],
      });
    }
  };
  const chatAlreadyExists = (recipientEmail) => {
    console.log(recipientEmail, "recipient");
    return !!chatSnapShot?.docs?.find((chat) =>
      chat.data()?.users?.find((user) => {
        console.log(user, "user");
        return user === recipientEmail;
      })
    );
  };
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        <Avatar src={user.photoURL} />
        <div className={classes.sidebar__headerRight}>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={() => setShowDialog(true)}>
            <AddTwoToneIcon />
          </IconButton>
          <IconButton onClick={() => setShowRequests(true)}>
            <StyledBadge badgeContent={0} color="secondary">
              <PeopleIcon />
            </StyledBadge>
          </IconButton>
        </div>
        <div className={classes.sidebar__headerLeft}></div>
      </div>
      <div className={classes.sidebar__search}>
        <div className={classes.sidebar__searchContainer}>
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className={classes.sidebar__chats}>
        {chatSnapShot?.docs.map((chat) => {
          return (
            <SidebarChat
              key={chat.id}
              users={chat.data().users}
              name={""}
              id={chat.id}
            />
          );
        })}
      </div>
      <FormDialog
        Open={showDialog}
        textChange={textChange}
        handleDialog={() => setShowDialog(true)}
        handleClose={() => setShowDialog(false)}
      ></FormDialog>
      <ViewFriends
        users={chatSnapShot?.docs.map(
          (chat) => chat.data().users?.filter((a) => a != user.email)[0]
        )}
        Open={showRequests}
        handleDialog={() => setShowRequests(true)}
        handleClose={() => setShowRequests(false)}
      />
    </div>
  );
};

export default SideBar;
