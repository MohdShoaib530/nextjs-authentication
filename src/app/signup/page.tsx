"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";


function Signup() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async ()=> {
    try {
      const { data } = await axios.post("/api/signup", user);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  return <div>Signup</div>;
}

export default Signup;
