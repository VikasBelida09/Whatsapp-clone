import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import UseProvider from "../src/components/useProvider";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <UseProvider>
        <div className="app">
          <Login />
        </div>
      </UseProvider>
    </Router>
  );
}

export default App;
