import React from 'react';


const Pagination = ({postsPerPage,totalPosts,paginate}) =>{
 const pageNumbers = [];

 for(let i = 1;i<=Math.ceil(totalPosts/postsPerPage);i++) pageNumbers.push(i);

  return (
    <nav>
      <ul className="pagination">
      {
        pageNumbers.map(numbers=>(
          <li key="numbers" className="page-item">
          <a onClick={()=>paginate(numbers)} href='#' className='page-link'>
          {numbers}
          </a>
          </li>
        ))
      }
      </ul>
    </nav>
  )

}


export default Pagination;