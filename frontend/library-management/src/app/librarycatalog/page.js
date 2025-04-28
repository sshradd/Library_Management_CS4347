"use client";

import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CatalogItem from "../components/CatalogItem";
import Link from 'next/link';

// Sample data for the catalog
const books = [
  { id: 1, author: "J.K. Rowling", title: "Harry Potter and the Sorcerer's Stone", year: 1997, language: "English" },
  { id: 2, author: "George Orwell", title: "1984", year: 1949, language: "English" },
  { id: 3, author: "Gabriel García Márquez", title: "One Hundred Years of Solitude", year: 1967, language: "Spanish" },
  // Add more book objects or fetch from an API
];

export default function LibraryCatalog() {
  // Search input state variables
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");

  // State for filtered results
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Filter logic on form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const results = books.filter((book) => {
      const matchesAuthor = author === "" || book.author.toLowerCase().includes(author.toLowerCase());
      const matchesTitle = title === "" || book.title.toLowerCase().includes(title.toLowerCase());
      const matchesYear = year === "" || book.year === Number(year);
      const matchesLanguage = language === "" || book.language.toLowerCase().includes(language.toLowerCase());
      return matchesAuthor && matchesTitle && matchesYear && matchesLanguage;
    });
    setFilteredBooks(results);
  };

  return (
    <div>
      <Link href="/checkOut" className="flex justify-end items-center gap-2 text-[24px] cursor-pointer hover:text-blue-600 transition py-5">
        <span className="font-semibold">Check Out</span>
        <FaShoppingCart size={28} />
      </Link>

      {/* Expand container width */}
      <div className="flex justify-center min-h-screen px-4">
        <div className="w-full max-w-5xl">
          <h1 className="text-center text-5xl font-bold my-8">Library Catalog</h1>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex flex-col w-full md:w-80">
              <label htmlFor="author" className="font-bold mb-1">Author</label>
              <input id="author" type="text" className="h-12 border px-4 rounded-lg" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="flex flex-col w-full md:w-80">
              <label htmlFor="title" className="font-bold mb-1">Title</label>
              <input id="title" type="text" className="h-12 border px-4 rounded-lg" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col w-full md:w-32">
              <label htmlFor="year" className="font-bold mb-1">Year</label>
              <input id="year" type="number" className="h-12 border px-4 rounded-lg" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="flex flex-col w-full md:w-32">
              <label htmlFor="language" className="font-bold mb-1">Language</label>
              <input id="language" type="text" className="h-12 border px-4 rounded-lg" value={language} onChange={(e) => setLanguage(e.target.value)} />
            </div>
            <div className="flex flex-col w-full md:w-auto md:self-end">
              <button
                type="submit"
                className="h-12 border px-4 rounded-lg bg-black text-white whitespace-nowrap hover:bg-blue-700 flex items-center justify-center"
              >
                Search
              </button>
            </div>
          </form>

          {/* Render filtered catalog vertically */}
          <div className="mt-6 flex flex-col space-y-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className="w-full">
                  <CatalogItem
                    author={book.author}
                    title={book.title}
                    year={book.year}
                    language={book.language}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}