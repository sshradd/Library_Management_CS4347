"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.Email) {
        setErrorMessage("No user found.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/api/profile.php?email=${user.Email}`
        );
        const data = await response.json();

        if (data.success) {
          setProfileData(data.data.profile);
          setTransactions(data.data.transactions);
          console.log(data.data.transactions);
        } else {
          setErrorMessage(data.error || "Error fetching profile data.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching the profile.");
        console.error("Error during profile fetch:", error);
      }
    };

    fetchProfileData();
  }, []);

  if (errorMessage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Error</h1>
          <p>{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  const groupedTransactions = transactions.reduce((acc, item) => {
    if (!acc[item.TransactionID]) {
      acc[item.TransactionID] = [];
    }
    acc[item.TransactionID].push(item);
    return acc;
  }, {});
  const transactionArray = Object.values(groupedTransactions).reverse();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-row">
          <IoPersonCircleOutline className="text-8xl" />

          <div className="flex flex-col w-full">
            <h1 className="text-5xl font-bold">{profileData.FullName}</h1>
            <h2 className="text-2xl font-bold">
              Date joined: {profileData.MembershipDate}
            </h2>
          </div>
        </div>

        <h1 className="text-3xl font-bold outline-4 p-2.5 rounded-2xl">
          Transaction History
        </h1>
        <ol className="list-inside list-item text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] outline-4 p-5 rounded-2xl space-y-4">
          {transactionArray.length > 0 ? (
            transactionArray.map((transactionItems, index) => (
              <li key={index} className="space-y-4">
                <h2 className="text-2xl font-bold">Transaction {index + 1}</h2>
                {transactionItems.map((item, index) => (
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
                      <div className="flex justify-between w-full gap-80">
                        <p className="text-2xl font-bold">{item.Title}</p>
                        <p className="text-xl font whitespace-nowrap justify-end">
                          Checked Out: {item.BorrowDate}
                        </p>
                      </div>
                      <div className="flex justify-between w-full gap-80">
                        {item.AuthorName && (
                          <p className="text-xl font-bold">
                            Author: {item.AuthorName}
                          </p>
                        )}
                        <p className="text-xl font whitespace-nowrap justify-end">
                          Return By: {item.DueByDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </li>
            ))
          ) : (
            <p>None</p>
          )}
        </ol>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
