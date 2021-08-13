import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import validator from "validator";
export default function FormDialog({ Open, textChange, handleClose }) {
  const [text, setText] = useState("");
  return (
    <div>
      <Dialog
        open={Open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a friend please enter the correct email address of your
            friend
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (validator.isEmail(text)) {
                textChange(text);
                handleClose();
              } else {
                alert("enter a valid email address");
              }
            }}
            color="primary"
          >
            Send Request
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
