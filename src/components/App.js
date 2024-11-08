import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { authService } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppRouter from "./Router";
console.log(authService);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false); //로그인 확인 시작 여부

  useEffect (() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //유저정보가 있다면
        setIsLoggedIn(true);
      } else {
        //유저정보가 없다면
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
    
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      
    </>
  );
}

export default App;
