import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import { db } from "../firebase";
import Comment from"../components/Comment";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  limit
} from "firebase/firestore";

const Home = ({userObj}) => {
  const [comment, setComment] = useState(""); //입력하는 글 정보
  const [comments, setComments] = useState([]); // 조회된 글 배열

  const getComments = async () => {
    const q = query(collection(db, "comments"), orderBy("date", "desc"), limit(5));

    const querySnapshot = await getDocs(q);
    /*
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const commentObj = {
        ...doc.data(),
        id:doc.id
      }
      setComments((prev=>[commentObj, ...prev]));
      //console.log(doc.id, " => ", doc.data());
    });
    */
   //const commentArr = querySnapshot.docs.map(doc=>{return{...doc.data(), id:doc.id}})
   const commentArr = querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id}))
   setComments(commentArr);

  };
  //console.log(comments);
  useEffect (()=>{
    getComments();
  },[]) //최초 렌더링 후 실행, 변동시 실행

  const onChange = (e) => {
    //let value = e.target.value;
    const {
      target: { value },
    } = e;
    setComment(value);
  };

  //await가 있으려면 위에 async가 있어야해요
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(comment, "실행");

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        //comments = firebase컬렉션 이름
        comment: comment,
        date: serverTimestamp(),
        uid: userObj
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="container">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Control
            type="text"
            onChange={onChange}
            placeholder="글을 입력해주세요"
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          입력
        </Button>
      </Form>
      <hr/>
        <ListGroup>
          {comments.map(item=> 
            <Comment key={item.id} commentObj={item} isOwner={item.uid === userObj}/>
            )}          
        </ListGroup>

    </div>
  )
};
export default Home;


