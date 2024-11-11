import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const Nav = ({ commentObj, isOwner }) => {
  return (
    <ListGroup.Item>
      <div className='d-flex justify-content-between'>
        {commentObj.comment}
        {isOwner &&
        
        <div className='d-flex gap-1'>
          <Button variant="outline-secondary" size="sm">
            수정
          </Button>
          <Button variant="outline-danger" size="sm">
            삭제
          </Button>
        </div>
        
        }
        
      </div>
    </ListGroup.Item>
  );
};
export default Nav;
