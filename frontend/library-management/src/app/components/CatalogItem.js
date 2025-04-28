import React from "react";
import Image from "next/image";

export default function CatalogItem({ author, title, year, language }) {
  return (
    <div className="mb-4">
      <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-4 border border-gray-200 shadow-sm">
        <li className="tracking-[-.01em] flex items-start flex-row gap-4">
          <Image
            className="dark:invert rounded-3xl"
            src="/book_pic.png"
            alt="Book image"
            width={100}
            height={100}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <p className="text-2xl font-bold">{title || "Book Title"}</p>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                Add to Cart
              </button>
            </div>
            <p className="text-xl font-bold">Author: {author || "First, Last"}</p>
            {year && <p className="text-md">Year: {year}</p>}
            {language && <p className="text-md">Language: {language}</p>}
          </div>
        </li>
      </ol>
    </div>
  );
}