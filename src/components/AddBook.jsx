import React, {Fragment, useState} from 'react';

function AddBooks() {

            const[book, setBook] = useState({
                    book_title: "",
                    book_author: "",
                    book_rating: "",
                    book_genre: "",
                    book_publication_date: "",
            })

    // create a function to handle all changes on the form

            function handleChange(event){

                const{name, value} = event.target

                setBook(prevInput =>{
                    return{
                        ...prevInput,
                        [name]:value
                    }
                })
            }

    // create a new book

        async function onSubmitForm(event)  {
            try {

                event.preventDefault();

                const body = {
                        book_title: book.book_title,
                        book_author: book.book_author,
                        book_rating: book.book_rating,
                        book_genre: book.book_genre,
                        book_publication_date: book.book_publication_date
                }
        
                await fetch('http://localhost:2010/books', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                });

                alert("Success: Book Added!");
                window.location ="/add-book";
            }catch (err) {

                console.error(err.message);

             }
   
         }

    return (

        <Fragment>

        <div className="container">
            <h3 className="text-center mt-5 mb-5">Add a Book</h3>
            <form onSubmit={onSubmitForm}>
              <div className="form-group">
                  <input onChange={handleChange} className="form-control" name="book_title" value={book.book_title} type="text"  placeholder="Book Title" required></input>
                </div>
              <div className="form-group">
                  <input  onChange={handleChange} name="book_author" value={book.book_author}type="text" className="form-control" placeholder="Book Author" required></input>
                </div>
              <div className="form-group">
                  <input onChange={handleChange} name="book_rating" value={book.book_rating} type="number" min="1" className="form-control" placeholder="Book Rating" required></input>
                </div>
              <div className="form-group">
                  <input onChange={handleChange} name="book_genre" value={book.book_genre} type="text" min="1" className="form-control" placeholder="Book Genre" required></input>
                </div>
              <div className="form-group">
                  <input onChange={handleChange} name="book_publication_date"  value={book.book_publication_date} type="date" className="form-control" placeholder="Book Publication Date" required></input>
                </div>

                  <button className="btn btn-lg btn-primary">Create</button>

            </form>              
        </div>

        </Fragment>

    )
}
export default AddBooks;
