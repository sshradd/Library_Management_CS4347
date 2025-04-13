import Image from "next/image";
import { IoPersonCircleOutline, IoCartOutline } from "react-icons/io5";

export default function Profile() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Shopping Cart Icon */}
      <div className="absolute top-6 right-12 flex flex-row items-center gap-2 text-[24px] cursor-pointer hover:text-blue-600 transition">
        <span className="font-semibold">Check Out</span>
        <IoCartOutline size={28} />
      </div>


      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-row">
          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-bold">Firstname Lastname</h1>
            <h2 className="text-2xl font-bold">Transaction ID: 123456789</h2>
          </div>
        </div>

        <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-4">
          {/* Book 1 */}
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
                <p className="text-2xl font-bold">The Great Gatsby</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Check Out Date: 04/05/25
                </p>
              </div>
              <div className="flex justify-between w-full gap-80">
                <p className="text-xl font-bold">Author: F. Scott Fitzgerald</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Return By: 04/19/25
                </p>
              </div>
            </div>
          </li>

          {/* Book 2 */}
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
                <p className="text-2xl font-bold">1984</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Check Out Date: 04/05/25
                </p>
              </div>
              <div className="flex justify-between w-full gap-80">
                <p className="text-xl font-bold">Author: George Orwell</p>
                <p className="text-xl font whitespace-nowrap justify-end">
                  Return By: 04/19/25
                </p>
              </div>
            </div>
          </li>
        </ol>

        {/* Confirm Checkout Button */}
        <div className="w-full flex justify-center">
          <button className="mt-4 px-6 py-3 bg-black text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition">
            Confirm Checkout
          </button>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
