"use client";

import { useEffect, useState } from "react";
import {
  CatalogItemBook,
  CatalogItemDVD,
  CatalogItemMagazine,
} from "../components/CatalogItem";

export default function LibraryCatalog() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");

  // State for filtered results
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [catalogItems, setCatalogItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getCatalog.php");

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      const data = await response.json();
      console.log(data);

      setCatalogItems(data);
      setFilteredBooks(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Filter logic on form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const results = catalogItems.filter((book) => {
      const matchesAuthor =
        author === "" ||
        (book.AuthorName &&
          book.AuthorName.toLowerCase().includes(author.toLowerCase())) ||
        (book.DvdPublisher &&
          book.DvdPublisher.toLowerCase().includes(author.toLowerCase())) ||
        (book.MagazinePublisher &&
          book.MagazinePublisher.toLowerCase().includes(author.toLowerCase()));
      const matchesTitle =
        title === "" ||
        (book.Title && book.Title.toLowerCase().includes(title.toLowerCase()));
      const matchesYear =
        year === "" ||
        (book.PublicationDate &&
          new Date(book.PublicationDate).getFullYear() === Number(year));
      const matchesLanguage =
        language === "" ||
        (book.Language &&
          book.Language.toLowerCase().includes(language.toLowerCase()));
      return matchesAuthor && matchesTitle && matchesYear && matchesLanguage;
    });
    setFilteredBooks(results);
  };

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existingCart, item]));
    alert(`${item.Title} added to cart!`);
  };

  return (
    <div>
      <div className="flex justify-center min-h-screen px-4">
        <div className="w-full max-w-5xl">
          <h1 className="text-center text-5xl font-bold my-8">
            Library Catalog
          </h1>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"
          >
            <div className="flex flex-col w-full md:w-80">
              <label htmlFor="author" className="font-bold mb-1">
                Author
              </label>
              <input
                id="author"
                type="text"
                className="h-12 border px-4 rounded-lg"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-80">
              <label htmlFor="title" className="font-bold mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="h-12 border px-4 rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-32">
              <label htmlFor="year" className="font-bold mb-1">
                Year
              </label>
              <input
                id="year"
                type="number"
                className="h-12 border px-4 rounded-lg"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-32">
              <label htmlFor="language" className="font-bold mb-1">
                Language
              </label>
              <input
                id="language"
                type="text"
                className="h-12 border px-4 rounded-lg"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
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
          {filteredBooks.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex items-center justify-between p-4"
            >
              <div className="flex-1">
                {item.BookID ? (
                  <CatalogItemBook
                    title={item.Title}
                    date={item.PublicationDate}
                    language={item.Language}
                    imageUrl={item.ImageUrl}
                    isbn={item.ISBN}
                    author={item.AuthorName}
                  />
                ) : item.DvdID ? (
                  <CatalogItemDVD
                    title={item.Title}
                    date={item.PublicationDate}
                    language={item.Language}
                    imageUrl={item.ImageUrl}
                    publisher={item.DvdPublisher}
                    duration={item.Duration}
                    format={item.Format}
                  />
                ) : item.MagazineID ? (
                  <CatalogItemMagazine
                    title={item.Title}
                    date={item.PublicationDate}
                    language={item.Language}
                    imageUrl={item.ImageUrl}
                    publisher={item.MagazinePublisher}
                    issue={item.Issue}
                    nameplate={item.Nameplate}
                  />
                ) : (
                  <div>No item type found</div>
                )}
              </div>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-4"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
