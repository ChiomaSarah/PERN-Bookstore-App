import React, { useState } from "react";

function UpdateBook({ book }) {
  const [book_id, setBookId] = useState(book.book_id);
  const [book_title, setBookTitle] = useState(book.book_title);
  const [book_author, setBookAuthor] = useState(book.book_author);
  const [book_rating, setBookRating] = useState(book.book_rating);
  const [book_genre, setBookGenre] = useState(book.book_genre);
  const [book_publication_date, setBookPublicationDate] = useState(book.book_publication_date);

  // function to save Changes onclick of the update button
  async function saveChanges(e) {
    try {
      e.preventDefault();
      const body = {
        book_id: book_id,
        book_title: book_title,
        book_author: book_author,
        book_rating: book_rating,
        book_genre: book_genre,
        book_publication_date: book_publication_date,
      };

       await fetch(
        `https://mysterious-hamlet-48690.herokuapp.com/https://bookstore-api-postgresql.herokuapp.com/books/${book.book_id}`,{
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      alert("Success: Book Updated!");
      window.location = "/books";
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      {/* create a modal for the update window */}
      <button type="button" className="btn btn-sm btn-info" data-toggle="modal" data-target={`#id${book.book_id}`}>
        Update
      </button>

      <div className="modal" id={`id${book.book_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            {/* modal header */}
            <div className="modal-header">
              <h4 className="modal-title" style={{ color: "#262626" }}>
                Edit Book
              </h4>
              <button type="button" className="close" data-dismiss="modal">&times;
              </button>
            </div>

            {/* modal body: create input tags for all fields*/}
            <div className="modal-body">
              <input onChange={(e) => setBookId(e.target.value)} className="form-control" name="book_id" value={book_id} type="number" min="1" placeholder="Book id"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setBookTitle(e.target.value)} className="form-control" name="book_title" value={book_title} type="text" placeholder="Book Title"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setBookAuthor(e.target.value)} name="book_author" value={book_author} type="text" className="form-control" placeholder="Book Author"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setBookRating(e.target.value)} name="book_rating" value={book_rating} type="number" min="1" className="form-control" placeholder="Book Rating"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setBookGenre(e.target.value)} name="book_genre" value={book_genre} type="text" min="1" className="form-control" placeholder="Book Genre"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setBookPublicationDate(e.target.value)} name="book_publication_date" value={book_publication_date} className="form-control" placeholder="dd-mm-yyyy"></input>
            </div>

            {/* modal footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveChanges(e)}>
                Save Changes
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateBook;
