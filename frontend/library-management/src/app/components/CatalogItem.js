import React from "react";
import Image from "next/image";

export const CatalogItemBook = ({
  title,
  date,
  language,
  imageUrl,
  isbn,
  author,
}) => {
  return (
    <div>
      <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-4">
        <li className="tracking-[-.01em] flex items-start flex-row justify-items-center gap-4">
          <Image
            className="dark:invert rounded-3xl"
            src={imageUrl}
            alt="Image"
            width={100}
            height={100}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full gap-80">
              <p className="text-2xl font-bold ">{title}</p>
              <p className="text-xl font whitespace-nowrap justify-end">
                Published: {date}
              </p>
            </div>
            <div className="flex justify-between w-full gap-80">
              <p className="text-xl font-bold">Author: {author}</p>
              <p className="text-xl font whitespace-nowrap justify-end">
                ISBN: {isbn}
              </p>
            </div>
            <div className="flex justify-between w-full gap-80">
              <p className="text-xl font-bold">Language: {language}</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};

export const CatalogItemDVD = ({
  title,
  date,
  language,
  imageUrl,
  publisher,
  duration,
  format,
}) => {
  return (
    <div>
      <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-4">
        <li className="tracking-[-.01em] flex items-start flex-row justify-items-center gap-4">
          <Image
            className="dark:invert rounded-3xl"
            src={imageUrl}
            alt="Image"
            width={100}
            height={100}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full gap-80">
              <p className="text-2xl font-bold ">{title}</p>
              <p className="text-xl font whitespace-nowrap justify-end">
                Published: {date}
              </p>
            </div>
            <div className="flex justify-between w-full gap-80">
              <p className="text-xl font-bold">Publisher: {publisher}</p>
              <p className="text-xl font whitespace-nowrap justify-end">
                Format: {format}
              </p>
            </div>
            <div className="flex justify-between w-full gap-80">
              <p className="text-xl font-bold">Language: {language}</p>
            </div>
            <div className="flex justify-between w-full gap-80">
              <p className="text-xl font-bold">Duration: {duration}</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};

export const CatalogItemMagazine = ({
  title,
  date,
  language,
  imageUrl,
  publisher,
  issue,
  nameplate,
}) => {
  return (
    <div className="mb-4">
      <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-4 border border-gray-200 shadow-sm">
        <li className="tracking-[-.01em] flex items-start flex-row gap-4">
          <Image
            className="dark:invert rounded-3xl"
            src={imageUrl}
            alt="Image"
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
            <p className="text-xl font-bold">
              Author: {author || "First, Last"}
            </p>
            {year && <p className="text-md">Year: {year}</p>}
            {language && <p className="text-md">Language: {language}</p>}
          </div>
        </li>
      </ol>
    </div>
  );
};
