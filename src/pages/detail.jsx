import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    firebase
      .getBookById(params.bookId)
      .then((value) => {
        if (value.exists()) {
          setData(value.data());
        } else {
          console.error("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  }, [params.bookId, firebase]);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase
        .getImageURL(imageURL)
        .then((url) => setURL(url))
        .catch((error) => {
          console.error("Error fetching image URL:", error);
        });
    }
  }, [data, firebase]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      {url && (
        <img
          src={url}
          alt={data.name}
          width="50%"
          style={{ borderRadius: "10px" }}
        />
      )}
      <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantity</Form.Label>
          <Form.Control 
          onChange={e => setQty(e.target.value)}
          value={qty}
          type="number" 
          placeholder="Enter Quantity" />
      </Form.Group>
      <Button variant="success" onClick={placeOrder}>Buy Now</Button>
    </div>
  );
};

export default BookDetailPage;
