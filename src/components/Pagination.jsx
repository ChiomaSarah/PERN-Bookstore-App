import React from 'react'

const Pagination = ({booksPerPage, totalBooks, paginate}) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div>
        <nav  aria-label="Page navigation">
         <ul className="pagination  justify-content-center">
             {pageNumbers.map(number =>(
                 
                 <li key={number} className="page-item"> <a onClick={()=>paginate(number)}  href="#books"  className="page-link">{number}</a>                    
                     
                 </li>
             ))}
             </ul>   

        </nav>
        </div>
    )
}
export default Pagination