import React from "react";
import './App.css';
import Routes from "./Routes";
import Nav from "./components/Nav"
import {UserProvider} from "./containers/UserContext";
import {RatingProvider} from "./containers/RatingContext";


function App() {
  return (
    <div className="App">
      <UserProvider>
        <RatingProvider>
          <Nav />
          <Routes/>
        </RatingProvider>
      </UserProvider>
    </div>
  );
}

export default App;
