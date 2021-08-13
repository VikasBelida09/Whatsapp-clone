import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
    },
    marginBottom:10
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Signin() {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off" >
      <TextField id="outlined-basic" label="Email" required />
      <TextField id="outlined-basic" label="Password" required/>
      <Button variant="contained" color="primary" size="small" className={classes.margin}>
        Signin
      </Button>
    </form>
  );
}
