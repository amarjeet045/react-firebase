import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  Alert,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
  Container,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContexts";
import { db } from "../firebase";
export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const { token } = useAuth();

  const handleClose = () => setShow(false);
  const nameRef = useRef();

  const { handleLogoutFunction } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    console.log("logout function");
    await handleLogoutFunction();
    history.push("/login");
  }

  async function createPost(e) {
    e.preventDefault();
    console.log("create post button is clicked");
    setShow(true);

    // modalRef.modal("show")
  }
  async function handleFormSubmit(e) {
    const name = nameRef.current.value;
    console.log(name);
    // http://localhost:5000/react-auth-727ef/us-central1/api
    const body = {
      name: name,
    };
    console.log(token);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOption = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/react-auth-727ef/us-central1/api/postinfo",
      requestOption
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    setShow(false);
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`http://localhost:5000/react-auth-727ef/us-central1/api/postinfo`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        setData(response.data);
        // setCommitHistory(response.items);
        // setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={createPost}>Create a Post</Nav.Link>
              <Nav.Link eventKey={2} onClick={handleLogout}>
                Logout
              </Nav.Link>
              <Nav.Link href="/profile">
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group id="name">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleFormSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {data.map((doc, index) => {
        return (
          <div key={index}>
            <h2>{doc.name}</h2>
          </div>
        );
      })}
    </>
  );
}
