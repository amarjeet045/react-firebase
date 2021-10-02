import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link ,useHistory} from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login,currentUser } = useAuth();
  const history = useHistory()
  console.log(JSON.stringify(currentUser))
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      console.log("login is successfull");
      history.push("/")
    } catch {
      setError("Failed to Login");
    }
    setLoading(false);
  }
  return (
    <>
      <div style={{ display: "block", margin: "20px auto" }}>
        <Card className="signUpCard">
          <Card.Body>
            <h2 className="signUpText">Log In</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button
                disabled={loading}
                id="submitSignupButton"
                type="submit"
                className="submitSignupButton"
              >
                Log In
              </Button>
            </Form>
            <div className="signupBottomText">
              Need an Account ? <Link to="/signup">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
