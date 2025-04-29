import React from "react";
import Image from "next/image";

export default function CatalogItem({ author, title, year, language }) {
  return (
    <div>
      <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-4">
        <li className="tracking-[-.01em] flex items-start flex-row justify-items-center gap-4">
          <Image
            className="dark:invert rounded-3xl"
            src="/book_pic.png"
            alt="Book image"
            width={100}
            height={100}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full gap-80">
              <p className="text-2xl font-bold ">Book Title</p>
              <p className="text-xl font whitespace-nowrap justify-end">
                Checked Out: MM/DD/YY
              </p>
            </div>
            <div className="flex justify-between w-full gap-80">
              <p className="text-xl font-bold">Author: First, Last</p>
              <p className="text-xl font whitespace-nowrap justify-end">
                Return By: MM/DD/YY
              </p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}
 