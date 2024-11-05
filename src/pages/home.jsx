import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "./card";

const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, [firebase]); // Include 'firebase' in the dependency array

  return (
    <div className="container mt-5 d-flex flex-wrap justify-content-between gap-4">
      {books.map((book) => (
        <BookCard 
        link={`/book/view/${book.id}`}
        key={book.id} 
        id={book.id} 
        {...book.data()} />
      ))}
    </div>
  );
};

export default HomePage;
