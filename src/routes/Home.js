import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { db } from "../firebase";
import Comment from "../components/Comment";
import { v4 as uuidv4 } from 'uuid';
import {  addDoc, collection, serverTimestamp, query, orderBy, limit, onSnapshot
} from "firebase/firestore";
import{ getStorage,  ref,  uploadString, getDownloadURL}  from "firebase/storage";
const Home = ({ userObj }) => {
  const [comment, setComment] = useState(""); //입력하는 글 정보
  const [comments, setComments] = useState([]); // 조회된 글 배열
  const [attachment, setAttachment] = useState();

  const storage = getStorage();
  const storageRef = ref(storage);

  const getComments = async () => {
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
    const q = query(
      collection(db, "comments"),
      orderBy("date", "desc"),
      limit(5)
    );
    onSnapshot(q, (querySnapshot) => {
      //  const commentArr = querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id}))

      const commentArr = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setComments(commentArr);
    });
  };

  //console.log(comments);
  useEffect(() => {
    getComments();
  });

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
    const storageRef = ref(storage, `${userObj}/${uuidv4()}`);

    uploadString(storageRef, attachment, 'data_url').then(async(snapshot) => {
      console.log('파일 업로드 완료!');
      //getDownloadURL(storageRef)
      //console.log(await getDownloadURL(storageRef));
      const imageURL = await getDownloadURL(storageRef);
      try {
        await addDoc(collection(db, "comments"), {
          //comments = firebase컬렉션 이름
          comment: comment,
          date: serverTimestamp(),
          uid: userObj,
          image: imageURL
        });
        document.querySelector("#comment").value = "";
        setAttachment('');
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });

  };

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    /*
    const {target:{files}} = e;
    const theFile = files[0]
    */
    const theFile = e.target.files[0];
    const reader = new FileReader();

    /*reader.addEventListener(
      "load",
      (e)=>{
        console.log(e.target.result);
      },
      false,
    );
  */
    reader.onloadend = (e) => {
      // console.log(e.target.result);
      setAttachment(e.target.result);
    };

    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearFile = () => {
    setAttachment(null);
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
        <Form.Group className="mb-3" controlId="formFilmSm">
          <Form.Label>이미지</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            size="sm"
            onChange={onFileChange}
          />
        </Form.Group>
        
        {attachment && (
          <div>
            <img src={attachment} alt="" width="50" />
            <Button
              variant="outline-danger"
              size="sm"
              type="button"
              onClick={onClearFile}
            >
              취소
            </Button>
          </div>
        )}
        <Button variant="outline-primary" type="submit">
          입력
        </Button>
      </Form>
      <hr />
      <ListGroup>
        {comments.map((item) => {
          return (
            <Comment
              key={item.id}
              commentObj={item}
              isOwner={item.uid === userObj}
            />
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Home;
