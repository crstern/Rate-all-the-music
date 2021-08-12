import React from "react";
import './App.css';
import Routes from "./Routes";
import Nav from "./components/Nav"
import {UserProvider} from "./containers/UserContext";


function App() {
  return (
    <div className="App">
      <UserProvider>
        <Nav />
        <Routes/>
      </UserProvider>
    </div>
  );
}

export default App;
