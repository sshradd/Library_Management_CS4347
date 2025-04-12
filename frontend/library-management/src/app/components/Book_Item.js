import React from "react";
import Image from "next/image";

const Book_Item = () => {
  return (
    <div>
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
    </div>
  );
};

export default Book_Item;
