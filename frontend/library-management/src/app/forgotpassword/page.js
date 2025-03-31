"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="my-8">
          <h1 className="text-5xl font-bold">Reset Password</h1>
          <h2 className="text-gray-600">
            Enter your email here and we'll send a password reset link.
          </h2>
        </div>

        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-left font-bold">
              Email
            </label>
            <input
              className="border p-2 rounded-lg mt-4"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <input
            className="bg-blue-500 text-white p-2 mt-4 rounded-lg"
            type="submit"
            value="Submit"
          ></input>
        </form>
        <div className="mt-4">
          <Link className="text-gray-600" href="/">
            {"< Back"}
          </Link>
        </div>
      </div>
    </div>
  );
}
