import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContexts";
export default function QrContext() {
  const [users, usersSet] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    async function fetchUsers() {
      var raw = undefined;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: "GET",
        body: raw,
        headers: myHeaders,
        redirect: "follow",
      };
      const result = await fetch(
        `http://localhost:5000/react-auth-727ef/us-central1/api/qrcode`,
        requestOptions
      );
      let res = await result.json();
      
      usersSet(res.data);
    }

    fetchUsers();
  }, []);
  const value = {
      users
  } 
  return value
}
