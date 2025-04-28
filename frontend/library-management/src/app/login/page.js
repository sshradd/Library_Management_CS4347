"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.data[0]));
        window.location.href = "/librarycatalog";
      } else {
        setErrorMessage(data.error || "Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="my-8">
          <h1 className="text-5xl font-bold">Login</h1>
        </div>

        {errorMessage && (
          <div className="text-red-500 mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-left font-bold">
              Email
            </label>
            <input
              className="border p-2 rounded-lg mb-4"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-left font-bold">
              Password
            </label>
            <input
              className="border p-2 rounded-lg"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg text-center"
          >
            Enter!
          </button>
        </form>

        <div className="mt-2">
          <Link className="text-red-500" href="/forgotpassword">
            {"Forgot password?"}
          </Link>
        </div>
        <div>
          <Link className="text-blue-500" href="/">
            {"Don't have an account? Sign up!"}
          </Link>
        </div>
      </div>
    </div>
  );
}
