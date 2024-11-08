import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { authService } from "../firebase";
import AppRouter from './Router';
//console.log(authService);

function App() {
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  return (
    <AppRouter isLoggedIn={isLoggedIn}/>
  );
}

export default App;
