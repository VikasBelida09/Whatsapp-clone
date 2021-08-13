import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "../../../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
    },
    marginBottom: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });
  const signUp = () => {
    if (user.password === user.confirmPassword) {
      Axios.post("/user/new", {
        name: user.name,
        mail: user.mail,
        password: user.password,
      })
        .then((r) => console.log(r))
        .catch((e) => console.log(e));
    }
  };
  return (
    <form className={classes.root} autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        value={user.mail}
        onChange={(e) => setUser({ ...user, mail: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Confirm Password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.margin}
        onClick={signUp}
      >
        Signup
      </Button>
    </form>
  );
}
