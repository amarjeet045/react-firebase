import React from "react";
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
export default function Checklist() {
  const { users } = QrContext();
  return (
    <>
      checklist
      {Object.values(users).length > 0 ? (
        <>
          {users.checkbox.length > 0 ? (
            <>
              <Card>
                <Card.Body>
                  <div>
                    <Form.Group>
                      {users.checkbox.map((check, index) => {
                        return (
                          <div key={index}>
                            <Form.Check
                              required
                              label={check.label}
                              defaultChecked={check.defaultValue}
                            />
                          </div>
                        );
                      })}
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </>
          ) : (
            ""
          )}
          {users.radioButton.length > 0 ? (
            <>
              <Card>
                <Card.Body>
                  <div>
                    {users.radioButton.map((radio, index) => {
                      const idealResponse = users.radioButton.find(
                        (o) => o.label === radio.label
                      );

                      return (
                        <div key={radio.label}>
                          {console.log(idealResponse)}
                          {idealResponse.defaultValue === false ? (
                            <div>
                              <p>{radio.label}</p>

                              <Form.Check
                                inline
                                type="radio"
                                label="Yes"
                                name={radio.label}
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="No"
                                name={radio.label}
                                defaultChecked={idealResponse.defaultValue}
                              />
                            </div>
                          ) : (
                            <div>
                              <p>{radio.label}</p>

                              <Form.Check
                                inline
                                type="radio"
                                label="Yes"
                                name={radio.label}
                                defaultChecked={idealResponse.defaultValue}
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="No"
                                name={radio.label}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </>
          ) : (
            ""
          )}
          {users.textField.length > 0 ? (
            <>
              <Card>
                <Card.Body>
                  <div>
                    {users.textField.map((doc, index) => {
                      return (
                        <div key={doc.label}>
                          <Form.Group id={doc.label}>
                            <Form.Label>{doc.label}</Form.Label>
                            <Form.Control
                              type={doc.type === "float" ? "number" : "text"}
                              className="textField"
                              required
                            ></Form.Control>
                          </Form.Group>
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </>
          ) : (
            ""
          )}
          {users.toggle.length > 0 ? (
            <>
              <Card>
                <Card.Body>
                  <div>
                    {users.toggle.map((doc, index) => {
                      return (
                        <div key={doc.label}>
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={doc.label}
                          />
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        "i think loader will be great"
      )}
    </>
  );
}
