import React ,{useRef, useState}from 'react';
import { Card,Button,Form, Alert } from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
export default function Signup() {
    const emailRef= useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false)
    const {signup} = useAuth();
    const history = useHistory()

  async  function handleSubmit(e) {
      e.preventDefault();
      if(passwordRef.current.value!==passwordConfirmRef.current.value)
      {
        return  setError("password doesn't matched")
      }
      try{
          setError("")
          setLoading(true)
      await signup(emailRef.current.value,passwordRef.current.value)
      emailRef.current.value="";
      passwordRef.current.value ="";
      passwordConfirmRef.current.value = ""
      console.log("form is submited")
      useHistory.push("/")
    


      }
      catch{
         
          setError("Failed to create an Account")
      }
      setLoading(false)

    }

    return (
        <>
        <div style = {{display:"block",margin:"20px auto"}}>
        <Card className="signUpCard">
            <Card.Body >
                <h2 className="signUpText">SignUp</h2>
                
                {error &&<Alert variant = "danger">{error}</Alert>}
                
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled= {loading} id="submitSignupButton" type="submit" className="submitSignupButton">Sign Up</Button>
                </Form>
                <div   className="signupBottomText">Already have an Account ? <Link to="/login">Log In</Link></div>
            </Card.Body>
        </Card>
        </div>
       
        </>
    )
}
