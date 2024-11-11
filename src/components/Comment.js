import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Form from "react-bootstrap/Form";

const Comment = ({ commentObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(commentObj.comment);

  const deleteComment = async () => {
    const deleteConfirm = window.confirm("정말 삭제할까요?");
    if (deleteConfirm) await deleteDoc(doc(db, "comments"), commentObj.id);
  };
  const toggleEditMode = () => {
    setEdit((prev) => !prev);
  };

  const onChange = (e) => {};
  const onSubmit = async (e) => {
    e.preventDefault();
    const commentRef = doc(db, "comments", "CommentObj.id");
    await updateDoc(commentRef, {
      comment: comment,
    });
    setEdit(false);
  };
  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    const theFile = e.target.files[0];
    /*const {target:{files} = e;
    const theFile = files[0 ]*/
  };

  return (
    <ListGroup.Item>
      <div className="d-flex flex-column">
        {edit ? (
          <Form onSubmit={onSubmit} className="d-flex">
            <Form.Group className="mb-3" controlId="comment">
              <Form.Control
                value="comment"
                type="text"
                onChange={onChange}
                placeholder="글을 입력해주세요"
              />
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>이미지</Form.Label>
              <Form.Control
                type="file"
                accept="image.*"
                size="sm"
                onChange={onFileChange}
              />
            </Form.Group>
            
            <div className="d-flex">
              <Button variant="danger" type="button" onClick={toggleEditMode}>
                취소
              </Button>
              <Button variant="primary" type="submit">
                입력
              </Button>
            </div>
          </Form>
        ) : (
          <>
            {commentObj.comment}
            {commentObj.image && (
              <img src={commentObj.image} alt="" width="100" />
            )}
            {isOwner && (
              <div className="d-flex gap-1 align-self-end">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={toggleEditMode}
                >
                  수정
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={deleteComment}
                >
                  삭제
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </ListGroup.Item>
  );
};
export default Comment;
