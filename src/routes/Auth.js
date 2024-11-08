import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { authService, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth();

  const onChange = (e) => {
    console.log(e.target.name);
    //
    /*
    //const evalue = e.target.password;
    //const pvalue = e.target.password;
    
    //const onSubmit = (e)=>{
*/
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (newAccount) {
      //회원가입
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //signed in//계정생성완료 후 할일
          const user = userCredential.user; //생성된 계정의 유저정보 확인
          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log(errorCode);
          // console.log(errorMessage);
          setError(errorMessage);
        });
    } else { //로그인
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <div className="container">
      <h1>{newAccount ? "회원가입" : "로그인"}</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={onChange}
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginPw">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={onChange} />
        </Form.Group>
        <Button type="submit" variant="primary">
          {newAccount ? "회원가입" : "로그인"}
        </Button>{" "}
        <div>{error}</div>
      </Form>
      <hr />
      <Button variant="secondary" onClick={toggleAccount}>
        {" "}
        {newAccount ? "로그인 하러가기" : "회원가입으로 가기"}
      </Button>
    </div>
  );
};

export default Auth;
