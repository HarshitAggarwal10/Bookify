import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "./card";

const OrdersPage = () => {

    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (firebase.isLoggedIn)
           firebase.fetchMyBooks(firebase.user.uid)?.then(books => setBooks(books.doc));
    }, [firebase])

    console.log(books);

    if (!firebase.isLoggedIn) return <h1>Please Login...</h1>

    return (
        <div>
            {
                books.map((book) => (
                <BookCard link={`/book/orders/${book.id}`} key={book.id} id={book.id} {...book.data} />))
            }
        </div>
    );
};

export default OrdersPage;