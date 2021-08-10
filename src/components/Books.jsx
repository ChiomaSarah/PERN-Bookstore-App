import React, {Fragment, useState, useEffect} from 'react';
import UpdateBook from "./UpdateBook";
import Spinner from "./ui/Spinner"
import Pagination from "./Pagination"

function Books() {
    const[books, setBooks] = useState([]);
    const[loading, setLoading] = useState(false);
    const[currentPage, setCurrentPage] = useState(1);
    const[booksPerPage] = useState(5);
    const[query, setQuery] = useState("");
  

    // fetch all books from the database
    useEffect(() => {

    async function getBooks( ) {

        try {
          setLoading(true);
            const response = await fetch("http://localhost:2010/books");
            const jsonData = await response.json();

            setBooks(jsonData.data);
            setLoading(false);
        } catch (err) {
            console.error(err.message);
        }
    };
          getBooks();
        
  },[]);
    

    // delete a book from the database

    async function deleteBook(id){
      try{
            await fetch(`http://localhost:2010/books/${id}`,{
              method: 'DELETE',
            });
    
            setBooks(books.filter(book => book.book_id !== id));
            alert("Success: Book deleted!")
      } catch (err) {
    console.error(err.message);
        }
    }

    // find a book by all parameters
    function search(books){
            return books.filter(book => 
                book.book_id.indexOf(query) >-1 ||
                book.book_title.toLowerCase().indexOf(query) >-1 ||
                book.book_author.toLowerCase().indexOf(query) >-1 ||
                book.book_genre.toLowerCase().indexOf(query) >-1 ||
                book.book_publication_date.indexOf(query) >-1 
            )
      }

    // create pagination for maximized viewing
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // change page number
    const paginate = (pageNumber) =>
      setCurrentPage(pageNumber);

    
      // render the fetched books from the database
      // if page is loading, display a spinning wheel, else display a tapable

    if(loading){
      return <Spinner />;
    }
      return (

        <Fragment >
          <div className="container text-center mt-5 mb-5">

            <h3>Books</h3>
            
            <div>

              {/* create a search bar to find a book */}

                <input type="text" placeholder="search book..." className="form-control mt-5 mb-5 float-right" style={{width:"20%"}}  onChange={(e)=>setQuery(e.target.value)}/>


              {/* create a dynamic table */}

                      {" "}
        <table className="table table-bordered mt-5 ">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Publication Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
            <tbody style={{color: "#fff"}}>
              {search(currentBooks).map((book) =>(
                  <tr key={book.book_id}>
                      <td>{book.book_id}</td>
                      <td>{book.book_title}</td>
                      <td>{book.book_author}</td>
                      <td>{book.book_rating}</td>
                      <td>{book.book_genre}</td>
                      <td>{book.book_publication_date}</td>
                      <td><span><UpdateBook book={book} /></span><span><button className="btn btn-sm btn-danger ml-2" onClick={()=> {const confirm = window.confirm(
                "Are you sure you want to delete this record?\n\nThis action cannot be undone."
              )
              if (confirm === true) {deleteBook(book.book_id)}}}>Delete</button></span></td>
                  </tr>
              ))}
            </tbody>
      </table>

         </div>
        </div>

        <Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} />

      </Fragment>
    )
}
export default Books;