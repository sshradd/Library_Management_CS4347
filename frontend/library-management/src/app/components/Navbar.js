import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Library Management
            </span>
          </Link>

          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-row items-center font-medium space-x-8 rtl:space-x-reverse">
              <li>
                <Link
                  href="/librarycatalog"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="flex items-center gap-2 py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                >
                  <span>Check Out</span>
                  <FaShoppingCart size={20} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
