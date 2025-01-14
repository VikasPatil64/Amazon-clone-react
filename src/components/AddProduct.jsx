import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProductDetails = async () => {
    let productUrl = "http://localhost:3000/products";
    const products = await fetch(productUrl);
    const productJson = await products.json();
    setProducts(productJson);
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price && description) {
      const productExists = products.find((product) => product.name === name);
      if (productExists) {
        alert("Product already exists");
        return;
      }
      console.log(name, price, description);
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, description }),
      })
        .then(() => {
          alert("Product added successfully");
          navigate("/product-list");
          setName("");
          setPrice("");
          setDescription("");
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred. Please try again later.");
        });
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <Container>
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Row> 
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="20"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="price">Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Product price"
                value={name}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                value={name}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Add Product
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddProduct;
