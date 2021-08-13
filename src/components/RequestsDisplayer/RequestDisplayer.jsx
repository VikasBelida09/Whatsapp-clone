import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width:75,
    fontSize:10,
    padding:4
  },
}));

export default function RequestDisplayer({ name }) {
  const classes = useStyles();

  return (
    <div style={{display:'flex',justifyContent:'space-around'}}>
      <p>{name}</p>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<CheckIcon />}
      >
        Accept
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<DeleteIcon />}
      >
        Reject
      </Button>
    </div>
  );
}
