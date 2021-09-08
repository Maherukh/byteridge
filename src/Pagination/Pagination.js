import React from 'react';
import { users } from '../_reducers/users.reducer';

const Pagination = ({ postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];
  for(let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i);
  } 

  return (
    <div>
        //page number code
        <ul>
          {pageNumbers.map(num => {
            <li key={num}><a onClick={() => paginate(number)} href="!#"></a>{num}</li>
          })}
        </ul>
    </div>
  );
};

export default Pagination;