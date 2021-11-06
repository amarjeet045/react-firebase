import React,{useRef,useState} from "react";
import QrContext from "../contexts/QrContext";
import {
  Card,
  Button,
  Form,
  Alert,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
const moment = require("moment");
export default function Booking() {
  const { users } = QrContext();
  let date =(moment().format("DD MM YYYY"));
  const dateRef = useRef();
  const startTimeRef =  useRef();
  const endTimeRef =  useRef();
  const bookingPlace =  useRef();
  
  console.log(date);
  async function handleBooking(e) 
  {
    e.preventDefault();
    console.log(users);
    console.log(dateRef.current.value,bookingPlace.current.value,startTimeRef.current.value,endTimeRef.current.value)
try {
    
} catch (error) {
    
}
  }
  return (
    <>
      {Object.values(users).length > 0 ? (
        <>
          {users.select.length > 0 ? (
            <Card className="BookingCard">
              <Card.Body>
                <p>Booking Resource</p>
                <Form onSubmit = {handleBooking}>
                  <Form.Group>
                    <Form.Label>Select Resource</Form.Label>
                    <Form.Control as="select" ref = {bookingPlace}>
                      {users.select.map((book, index) => {
                        return (
                          <>
                            <option key={index}>{book.label}</option>
                          </>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Booking Date</Form.Label>
                    <Form.Control type="date" ref= {dateRef} defaultValue = {moment().format("DD/MM/YYYY")}  required></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type="time"ref={startTimeRef} required></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>End Time</Form.Label>
                    <Form.Control type="time" ref={endTimeRef} required></Form.Control>
                  </Form.Group>
                  <Button
                
                id="bookingSubmitButton"
                type="submit"
                className="submitSignupButton"
              >
                Book Now
              </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            "empty select"
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
