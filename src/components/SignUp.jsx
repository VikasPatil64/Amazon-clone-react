import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router";

function SignUp() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        setUsers(users);
        })
      }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && number && email) {
      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        alert("User already exists");
        return;
      }
      const newUser = { name, number, email, password };
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        .then((user) => {
          console.log(user);
          alert("sign up successful");
          navigate("/User-Login");

          })
          .catch((error) => {
            console.error(error);
            alert("sign up failed");
            });
          
            return;
    } 
      alert("Please fill all the fields");
    
  };
  return (
    <div>
      <Container>
        <h2 >Sign in/ <Link to="/User-Login">Log in</Link></h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="number">Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mobile Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Button variant="primary" type="submit">
                  Sign in
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}


export default SignUp;
