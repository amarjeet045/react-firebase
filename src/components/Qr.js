import React,{useEffect,useState} from 'react'
import { Card, Button, Form, Alert,Modal,Container,Row,Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContexts";
import { Link ,useHistory} from "react-router-dom";
export default function Qr() {
  const history = useHistory();
    const { token } = useAuth();
    const [qrData,setQrData] =  useState({})
    useEffect(() =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        fetch(`http://localhost:5000/react-auth-727ef/us-central1/api/qrcode`, {
          method: "GET",
          headers: myHeaders,
        })
          .then((res) => res.json())
          .then((response) => {
            if(response.success)
            {
            setQrData(response.data);
            }
           
          })
          .catch((error) => console.log(error));
    },[])
    function checklistRedirectFunction() {
      history.push("/checklist")
      console.log("checklist card is clicked")
    }
    return (
        <>
           {(Object.values(qrData).length>0)?
           
           
           <>
           {/* make the header */}
           {/* add the location */}
           <section >
           <div className="loactions">
             {qrData.location}
             {qrData.section}
             {qrData.floor}
           </div>
           </section>
          
           {/* create the cards for actions */}
           <section>
           <Container>
  {/* Stack the columns on mobile by making one full-width and the other half-width */}
  <Row>
    <Col xs={3} md={3}>
      <Card onClick={checklistRedirectFunction}>
        <Card.Body>
        <img alt="checklist" src="https://photos.growthfile.com/file/static-page-images/Checklist.svg?timestamp=1632738468448" />
        <p className="serviceText">Checklist</p>
        </Card.Body>
      </Card>
    </Col>
    <Col xs={3} md={3}>
      <Card>
    <Card.Body>
        <img alt="checklist" src="https://photos.growthfile.com/file/static-page-images/Booking.svg?timestamp=1632738391375" />
        <p className="serviceText">Booking</p>
        </Card.Body>
        </Card>
    </Col>
    <Col xs={3} md={3}>
      <Card>
    <Card.Body>
        <img alt="checklist" src="https://photos.growthfile.com/file/static-page-images/visitor.svg?timestamp=1625649684061" />
        <p className="serviceText">Visitor Pass</p>
        </Card.Body>
        </Card>
    </Col>
    <Col xs={3} md={3}>
      <Card>
    <Card.Body>
        <img alt="checklist" src="https://photos.growthfile.com/file/static-page-images/Checklist.svg?timestamp=1632738468448" />
        <p className="serviceText">Orders</p>
        </Card.Body>
        </Card>
    </Col>
  </Row>

 

 
</Container>
           </section>
           {/* and feed cards  */}
           {/* actions on feed card */}
           </>
           
           
           
           :console.log("data is not available")
             
           }
          
            qrpage
        </>
    )
}
