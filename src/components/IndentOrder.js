import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContexts";

export default function IndentOrder() {
  const { token } = useAuth();
  const [productData, setProductData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchFilterResult, setSearchFilterResult] = useState([]);
  const myInput = useRef("");
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`http://localhost:5000/react-auth-727ef/us-central1/api/product`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((response) => {
        setProductData(response);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSearch(e) {
    const input = myInput.current.value.toLowerCase();
    setSearchFilter(input);
    if (searchFilter !== "") {
      const data = []
      
      productData.forEach(doc =>{
     
          let mergeData = {
            ...doc,
            ...doc.attributes
          }
          data.push(mergeData)
      })
      const filterData = data.filter((doc) => {
        return Object.values(doc).join("").toLowerCase().includes(input);
      });
      setSearchFilterResult(filterData)
    } else {
      setSearchFilterResult(productData);
    }
  }
  console.log(productData[1])
  function handleProductDetails(e) {
    console.log(e.target.getAttribute("id"));
  }
  console.log(searchFilterResult)
  let res;
  if(searchFilterResult.length===productData.length)
  {
    res = productData
  }
  else  if(searchFilterResult.length>0)
  {
    res = searchFilterResult
  }
  else{
    res =  productData
  }
  const productCard = res.map((doc) => {
    return (
      <>
        <Col xs={12} md={4} key={doc.name}>
          <Card
            className="productCard"
            onClick={handleProductDetails}
            id={doc.productId}
          >
            <img
              src={doc.productImageUrl[0]}
              alt={doc.name}
              className="cardImg"
            />
            <p className="cardName">{doc.name}</p>
          </Card>
        </Col>
      </>
    );
  });
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={myInput}
            onKeyUp={handleSearch}
            type="text"
            placeholder="Search Products by name"
          />
        </Form.Group>
      </Form>

      <div>
        <Container>
          <Row>{productCard}</Row>
        </Container>
      </div>
    </>
  );
}
