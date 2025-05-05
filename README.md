# How to Use the Library Management System

Using our Library Management System is very simple and intuitive. Below is a guide on the how to use the website to perform the main functionalities:

**Sign Up or Log In**

Once you open the website you are prompted to either sign up or login with your credentials. 

- Signing up performs a CREATE operation in our database by creating a new user record.
- Logging in or signing up redirects you to the catalog page.

**Catalog Page**

Navigate to the catalog page to browse, search for, and check-out books. 

- On the catalog page you can browse through the library’s vast collection of available books stored in our database. 
- If you are looking for a specific book, the catalog page has a search functionality where you can search for books using the title, author, publication year, or language. 
- After finding the book you like, you can click the “Add to cart” button to add it to the list of items you wish to check out. After you have added all desired items to the cart, you can use the “Check Out” button in the top right to view your current cart and proceed with check-out. 

**Check-Out Books**

Check out books from the catalog page by adding them to your cart.

- Each item on the catalog page contains an “Add to Cart” button. Simply click this button to add that book to your cart of items you’d like to check out.
- Click “Check Out” in the top right corner to view the current items in your cart and decide whether you want to check them out. When you’re happy with the contents of your cart and ready to check-out, simply click “Confirm Checkout” and the books are now yours. 
    - Checking out books performs an UPDATE operation in our database, moving books from the catalog to a user’s transaction history.
- You will be able to view your transaction, including the items, the check-out date, and the date they need to be checked in by, on your profile page. 

**Profile Page**

Navigate to the profile page to view your account details and transactions.

- On the profile page you can view your account details like name and membership date. Here you can also access your transaction history, which includes items you have checked out at the library. Each item contains the date it was checked out, the date it needs to be checked in by, and an option to check in the book.
    - Viewing the profile page performs a READ operation to our database by retrieving the current data, like current transaction and account details, from the database. 
- From this profile page you can also delete your account if you wish to no longer be a member of the library.
    - Deleting your account performs a DELETE operation on our database as the user’s record will be completely removed from the database.

**Check-In Books**

Check-In books from the profile page.

- Whenever you are done with your book and wish to check it back in, all you need to do is go to your profile page, find the corresponding transaction, and select the check in button. From there, the book will be updated and sent back to the catalog page where it is now available to be checked out by other users. 
    - Checking in books performs another UPDATE operation on our database as books are being moved from a current transaction to the catalog page.
m
