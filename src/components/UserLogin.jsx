import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function UserLogin() {
  const [identifier, setIdentifier] = useState("");
  const [userPassword, setUserPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (identifier && userPassword) {
      fetch("http://localhost:3000/users")
      .then(response => response.json())
      .then(users => {
        console.log(users);
        const user = users.find(user => (user.email === identifier || user.number === identifier) && user.password === userPassword);
        if (user) {
          alert("Log in successful");
          sessionStorage.setItem("user", JSON.stringify(user));
          navigate("/");
          } else {
            alert("Invalid email/number or password");
            }
      })
      .catch(error => console.error(error));
    }
  }
  return (
    <div>
       <Container>
        <h2 >Log in</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="identifier">Email or Mobile Number</Form.Label>
                <Form.Control
                  type="identifier"
                  placeholder="Email or Mobile Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Button variant="primary" type="submit">
                  Log in
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default UserLogin