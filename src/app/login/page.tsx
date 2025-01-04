"use client";

import React, { useState } from "react";
import Navbar from "../_components/layout/Navbar";
import HomePage from "../_base/homePage";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
    // Add your login logic here
  };

  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}
