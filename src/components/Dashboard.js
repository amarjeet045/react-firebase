import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Form, Alert, Modal } from "react-bootstrap";
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
    var raw = undefined;

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
      <button onClick={handleLogout}>Logout</button>
      <br></br>
      <button onClick={createPost}>Post</button>
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
      {
        data.map((doc,index) =>{
         return(
<div key= {index}>
  <h2>{doc.name}</h2>

</div>
         )
        })
      }
    </>
  );
}
