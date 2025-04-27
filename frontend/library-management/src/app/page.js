import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="my-8">
            <h1 className="text-5xl font-bold">Sign Up</h1>
          </div>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-left font-bold">
                Full Name
              </label>
              <input
                className="border p-2 rounded-lg mb-4"
                type="fullname"
                name="fullname"
              ></input>
            </div>
          </form>

          <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-left font-bold">
                Email
              </label>
              <input
                className="border p-2 rounded-lg mb-4"
                type="email"
                name="email"
              ></input>
            </div>
          </form>
          <form className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <label htmlFor="password" className="text-left font-bold">
                Password
              </label>
              <input
                className="border p-2 rounded-lg"
                type="password"
                name="password"
              ></input>
            </div>
            <Link
              className="bg-blue-500 text-white p-2 rounded-lg text-center"
              href="/"
            >
              {"Welcome!"}
            </Link>
          </form>
          <div className="mt-2">
            <Link className="text-blue-400" href="/login">
              {"Already have an account? Login!"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
