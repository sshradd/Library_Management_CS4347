import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Profile() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-row">
          <IoPersonCircleOutline className="text-8xl" />
          
          <div className="flex flex-col w-full">
            <h1 className="text-5xl font-bold">Firstname Lastname</h1>
            <h2 className="text-2xl font-bold">ID: 123456789</h2>
          </div>
        </div>

        <h1 className="text-3xl font-bold outline-4 p-2.5 rounded-2xl">
          Transaction History
        </h1>
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

    
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
