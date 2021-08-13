import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "../../axios";
import { useEffect, useState } from "react";
import Loader from "../UI/loader/loader";
import RequestDisplayer from "../RequestsDisplayer/RequestDisplayer";
export default function ViewFriends({ Open, handleDialog, handleClose }) {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    Axios.get("/user/5fcf92a6ff315425ccac274b/showRequests")
      .then((resp) => setRequests(resp.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <Dialog
        open={Open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Friend Requests</DialogTitle>
        <DialogContent>
          {requests.length ? (
            requests.map((request) => (
              <RequestDisplayer key={request._id} name={request.name} />
            ))
          ) : (
            <Loader />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
