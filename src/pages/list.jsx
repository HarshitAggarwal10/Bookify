import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const ListingPage = () => {
    const firebase = useFirebase();

    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState(null); // Update the initial value to null

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
          alert("Listing created successfully!");
      } catch (error) {
          alert(`Error: ${error.message}`);
      }
  };
  

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Book Name"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicIsbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        onChange={(e) => setIsbnNumber(e.target.value)}
                        value={isbnNumber}
                        type="text"
                        placeholder="ISBN Number"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        type="text"
                        placeholder="Enter Price"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCoverPic">
                    <Form.Label>Cover Pic</Form.Label>
                    <Form.Control
                        onChange={(e) => setCoverPic(e.target.files[0])}
                        type="file"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default ListingPage;
