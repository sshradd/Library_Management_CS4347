"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem("user");

    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.data[0]));
        setIsLoggedIn(true);
        router.push("/librarycatalog");
      } else {
        setErrorMessage(data.error || "An error occurred during sign up.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error during sign up:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold">You are logged in</h1>
          <p className="mt-4">Welcome back! You are successfully logged in.</p>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white p-2 rounded-lg mt-4"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="my-8">
          <h1 className="text-5xl font-bold">Sign Up</h1>
        </div>
        {errorMessage && (
          <div className="text-red-500 mb-4">
            <p>{errorMessage}</p>
          </div>
        )}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-left font-bold">
              Full Name
            </label>
            <input
              className="border p-2 rounded-lg mb-4"
              type="text"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

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
              required
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
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg text-center"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-2">
          <p className="text-blue-400">
            {"Already have an account?"}{" "}
            <a href="/login" className="text-blue-400">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
