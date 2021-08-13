import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
function AddFriend() {
  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a friend please enter the correct email address of your friend
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={sendRequest} color="primary">
          Send Request
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
}

export default AddFriend;
