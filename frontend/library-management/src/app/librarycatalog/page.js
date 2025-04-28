"use client";

import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CatalogItem from "../components/CatalogItem";
import Link from 'next/link';


export default function LibraryCatalog() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    if (author && title && year && language) {
      setSubmitted(true);
      console.log({ author, title, year, language });
      
    }

  }


  return (
    <div>
    
    <Link href="/checkOut" className="flex flex-row items-center gap-2 text-[24px] cursor-pointer hover:text-blue-600 transition justify-end py-5">
      <span className="font-semibold">Check Out</span>
      <FaShoppingCart size={28} />
    </Link>
      <div className="flex justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold my-8">Library Catalog</h1>
          <form className="flex flex-row space-x-4 items-center">
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
            <div className="flex flex-col text-left w-32">
              <label htmlFor="year" className="font-bold">
                Year
              </label>
              <input
                id="year"
                type="number"
                name="year"
                className="border p-2 rounded-lg mb-4"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col text-left w-32">
              <label htmlFor="year" className="font-bold">
                Language
              </label>
              <input
                id="language"
                type="text"
                name="language"
                className="border p-2 rounded-lg mb-4"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
            <CatalogItem
              author={author}
              title={title}
              year={year}
              language={language}
            />
        </div>
      </div>
    </div>
  );

}