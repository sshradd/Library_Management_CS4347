"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
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
  const [submitted, setSubmitted] = useState(false);

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

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    if (author && title && year && language) {
      setSubmitted(true);
      console.log({ author, title, year, language });
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2 text-[24px] cursor-pointer hover:text-blue-600 transition justify-end py-5">
        <span className="font-semibold">Check Out</span>
        <FaShoppingCart size={28} />
      </div>
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
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
          {catalogItems.map((item, index) => (
            <div key={index} className="mb-4">
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
          ))}
        </div>
      </div>
    </div>
  );
}
