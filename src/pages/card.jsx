import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const [url, setURL] = useState(null);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, [firebase, props.imageURL]); // Add 'firebase' and 'props.imageURL' to the dependency array

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title {props.name} and this book is sold by {props.displayName} and this book costs Rs. {props.price}
        </Card.Text>
        <Button variant="primary" onClick={(e) => 
          navigate(props.link)}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
