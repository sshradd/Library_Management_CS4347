"use client";

import { useState } from "react";

export default function LibraryCatalog() {

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold my-8">Library Catalog</h1>

        <form
          className="flex flex-col space-y-4 items-center"
        >
          <div className="flex flex-col text-left w-64">
            <label htmlFor="author" className="font-bold">
              Author
            </label>
            <input
              id="author"
              type="text"
              name="author"
              className="border p-2 rounded-lg mb-4"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left w-64">
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="border p-2 rounded-lg mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
