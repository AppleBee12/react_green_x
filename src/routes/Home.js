import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import { db } from '../firebase';
import { addDoc, collection, updateDoc, serverTimestamp } from "firebase/firestore"; 


const Home = ()=>{
  const [comment, setComment] = useState('');

  const onChange = (e)=>{
    //let value = e.target.value;
    const {target:{value}} = e;
    setComment(value);
  }

  //await가 있으려면 위에 async가 있어야해요
  const onSubmit = async (e)=>{
    e.preventDefault();
    console.log(comment, '실행');

    try {
      const docRef = await addDoc(collection(db, "comments"), {//comments = firebase컬렉션 이름
        comment:comment,
        date:serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }
  return(
    <div className="container">
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Control type="text" onChange={onChange} placeholder="글을 입력해주세요" />
      </Form.Group>
      <Button variant="outline-primary" type="submit">입력</Button>
    </Form>
    </div>
  )
}
export default Home;