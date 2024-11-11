import React from 'react';
import Form from "react-bootstrap/Form";
import ListGroup from 'react-bootstrap/ListGroup';

const Nav = ({commentObj})=>{
  return(
    <ListGroup.Item>{commentObj.comment}</ListGroup.Item>
  )
}
export default Nav;