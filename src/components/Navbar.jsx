import React from "react";
import {Link} from "react-router-dom"


function Navbar() {

    return( 
        <nav className="navbar bg-info">

            <h3>BOOK STORE</h3>
            <h4><Link to="/" className="link">Home</Link></h4>
            <h4><Link to="/books" className="link">Books</Link></h4>
            <h4><Link to="/add-book" className="link">Add Book</Link></h4>  
                    
        </nav>
    )  
}
export default Navbar;
