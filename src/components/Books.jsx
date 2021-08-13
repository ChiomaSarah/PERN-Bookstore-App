import React, { useState, useEffect } from "react";
import UpdateBook from "./UpdateBook";
import Spinner from "./ui/Spinner";
import Pagination from "./Pagination";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  // fetch all books from the database
  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://mysterious-hamlet-48690.herokuapp.com/https://bookstore-api-postgresql.herokuapp.com/books"
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setBooks(jsonData.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    }
    getBooks();
  }, []);

  // delete a book from the database
  async function deleteBook(id) {
    try {
      await fetch(
        `https://mysterious-hamlet-48690.herokuapp.com/https://bookstore-api-postgresql.herokuapp.com/books/${id}`,
        {
          method: "DELETE",
        }
      );

      setBooks(books.filter((book) => book.book_id !== id));
      alert("Success: Book deleted!");
    } catch (err) {
      console.error(err.message);
    }
  }

  // create pagination for maximized viewing
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // render the fetched books from the database
  // if page is loading, display a spinning wheel, else display a tapable

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="container text-center mt-5 mb-5">
        <h3>Books</h3>

        <div>
          {/* create a search bar to find a book */}
          <input type="text" placeholder="search book..." className="form-control mt-5 mb-5 float-right" style={{ width: "20%" }} onChange={(e) => setSearchQuery(e.target.value)} />
          
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
            <tbody style={{ color: "#fff" }}>

              {/* filter the table to return a search term and map the filtered table to display all items */}
              {currentBooks
                .filter((val) => {
                  if (searchQuery === " ") {
                    return val;
                  } else if (
                    val.book_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    val.book_author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    val.book_genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    val.book_publication_date.includes(searchQuery)
                  ) {
                    return val;
                  } else {
                    return "";
                  }
                })
                .map((book) => (
                  <tr key={book.book_id}>
                    <td>{book.book_id}</td>
                    <td>{book.book_title}</td>
                    <td>{book.book_author}</td>
                    <td>{book.book_rating}</td>
                    <td>{book.book_genre}</td>
                    <td>{book.book_publication_date}</td>
                    <td>
                    <div class="btn-group">
                      <UpdateBook book={book} />                   
                        <button className="btn btn-sm btn-danger ml-3" onClick={() => {
                            const confirm = window.confirm("Are you sure you want to delete this record?\n\nThis action cannot be undone.");
                            if (confirm === true) {
                              deleteBook(book.book_id);
                            }
                          }}>
                          Delete
                        </button>
                        </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        paginate={paginate}
      />
    </div>
  );
}
export default Books;
