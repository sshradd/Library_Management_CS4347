import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";
//import Book_Item from "../components/book_item";

export default function Profile() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-row">
          <div className="flex flex-col w-full">
            <h1 className="text-5xl font-bold">Currently Checked Out</h1>
          </div>
        </div>

        <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-8">
          {/* Book 1 */}
          <li className="tracking-[-.01em] flex items-start flex-row justify-items-center gap-4">
            <Image
              className="dark:invert rounded-3xl"
              src="/book_pic.png"
              alt="Book image"
              width={110}
              height={110}
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full gap-80">
                <p className="text-2xl font-bold">The Silent Whisper</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Checked Out: 04/10/25
                </p>
              </div>
              <div className="flex justify-between w-full gap-80">
                <p className="text-xl font-bold">Author: Jane Doe</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Return By: 05/10/25
                </p>
              </div>
              {/* Check In Button */}
              <div className="flex justify-end mt-2">
                <button className="px-6 py-2 bg-black text-white text-lg font-semibold rounded-xl hover:bg-green-700 transition">
                  Check In
                </button>
              </div>
            </div>
          </li>

          {/* Book 2 */}
          <li className="tracking-[-.01em] flex items-start flex-row justify-items-center gap-4">
            <Image
              className="dark:invert rounded-3xl"
              src="/book_pic.png"
              alt="Book image"
              width={110}
              height={110}
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full gap-80">
                <p className="text-2xl font-bold">Echoes of Tomorrow</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Checked Out: 04/05/25
                </p>
              </div>
              <div className="flex justify-between w-full gap-80">
                <p className="text-xl font-bold">Author: John Smith</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Return By: 05/05/25
                </p>
              </div>
              {/* Check In Button */}
              <div className="flex justify-end mt-2">
                <button className="px-6 py-2 bg-black text-white text-lg font-semibold rounded-xl hover:bg-green-700 transition">
                  Check In
                </button>
              </div>
            </div>
          </li>

          {/* Book 3 */}
          <li className="tracking-[-.01em] flex items-start flex-row justify-items-center gap-4">
            <Image
              className="dark:invert rounded-3xl"
              src="/book_pic.png"
              alt="Book image"
              width={110}
              height={110}
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full gap-80">
                <p className="text-2xl font-bold">Beyond the Horizon</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Checked Out: 03/30/25
                </p>
              </div>
              <div className="flex justify-between w-full gap-80">
                <p className="text-xl font-bold">Author: Emily Clark</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Return By: 04/30/25
                </p>
              </div>
              {/* Check In Button */}
              <div className="flex justify-end mt-2">
                <button className="px-6 py-2 bg-black text-white text-lg font-semibold rounded-xl hover:bg-green-700 transition">
                  Check In
                </button>
              </div>
            </div>
          </li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
