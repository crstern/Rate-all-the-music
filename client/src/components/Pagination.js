import React from 'react';
import Button from './Button';

const Pagination = (props) => {
  return (
    <div>
      <h1>Current page: {props.currentPage}</h1>
      <Button name={"next"} function={props.function} />
    </div>
  )
}

export default Pagination;