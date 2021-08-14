import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserContext } from "../useProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

export default function ViewFriends({
  Open,
  handleDialog,
  handleClose,
  users,
}) {
  const [userSnapshot] = useCollection(db.collection("users"));
  const renderOnlineUserFriends = () => {
    console.log(users, "users");
    return userSnapshot?.docs
      ?.map((a) => a?.data?.())
      .filter((usr) => users?.includes(usr.email) && usr.status == "online")
      .map((a) => <p>{`${a.email}`}</p>);
  };
  return (
    <div>
      <Dialog
        open={Open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Friends currently online
          {renderOnlineUserFriends()}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
