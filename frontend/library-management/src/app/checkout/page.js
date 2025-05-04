"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutDate, setCheckoutDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

    const today = new Date();
    const returnBy = new Date();
    returnBy.setDate(today.getDate() + 7);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setCheckoutDate(formatDate(today));
    setReturnDate(formatDate(returnBy));

    const fetchProfileData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.Email) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/api/profile.php?email=${user.Email}`
        );
        const data = await response.json();

        if (data.success) {
          setProfileData(data.data.profile);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchProfileData();
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleConfirmCheckout = async () => {
    if (cartItems.length > 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        userEmail: user.Email,
        cartItems: cartItems,
        checkoutDate: checkoutDate,
        returnDate: returnDate,
      };

      try {
        const response = await fetch("http://localhost:8000/api/checkout.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          // Handle successful checkout (e.g., show a success message or navigate to another page)
          alert("Checkout successful!");
          // Optionally, you can clear the cart after successful checkout
          localStorage.removeItem("cart");
          setCartItems([]);
        } else {
          alert("Error during checkout: " + result.message);
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        alert("An error occurred while confirming checkout.");
      }
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-row">
          <div className="flex flex-col w-full">
            <h1 className="text-5xl font-bold">Cart Items</h1>
          </div>
        </div>

        <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="tracking-[-.01em] flex items-start flex-row justify-items-center gap-4"
              >
                <Image
                  className="dark:invert rounded-3xl"
                  src={item.ImageUrl || "/book_pic.png"}
                  alt={`${item.Title} image`}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full gap-4">
                    <p className="text-2xl font-bold">{item.Title}</p>
                    <p className="text-xl whitespace-nowrap">
                      Checked Out: {checkoutDate}
                    </p>
                  </div>
                  <div className="flex justify-between w-full items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xl truncate">
                        {item.AuthorName
                          ? `Author: ${item.AuthorName}`
                          : item.DvdPublisher
                          ? `Publisher: ${item.DvdPublisher}`
                          : item.MagazinePublisher
                          ? `Publisher: ${item.MagazinePublisher}`
                          : "No Author/Publisher"}
                      </p>
                    </div>
                    <p className="text-xl whitespace-nowrap">
                      Return By: {returnDate}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-1 text-sm rounded-lg hover:bg-red-600 mx-auto w-auto"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-xl font-semibold text-gray-500">
              No items in cart
            </p>
          )}
        </ol>

        <div className="w-full flex justify-center">
          <button
            className={`mt-4 px-6 py-3 text-lg font-semibold rounded-xl transition ${
              cartItems.length === 0
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-black text-white hover:bg-blue-700"
            }`}
            onClick={() => {
              if (cartItems.length > 0) {
                handleConfirmCheckout();
              }
            }}
            disabled={cartItems.length === 0}
          >
            Confirm Checkout
          </button>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
