CREATE TABLE PATRON (
    Email VARCHAR(100) NOT NULL,
    FullName VARCHAR(100) NOT NULL,
    MembershipDate DATE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    
    CONSTRAINT PATRONPK PRIMARY KEY (Email)
);


CREATE TABLE LIBRARY_TRANSACTION (
    TransactionID INT NOT NULL AUTO_INCREMENT,
    PatronEmail VARCHAR(100) NOT NULL,
    BorrowDate DATE NOT NULL,
    DueByDate DATE NOT NULL,
    ReturnedDate DATE,
    
    CONSTRAINT TRANSACTIONPK PRIMARY KEY (TransactionID),
    
    CONSTRAINT FK_TRANSACTION_PATRON FOREIGN KEY (PatronEmail) REFERENCES PATRON(Email)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
    CONSTRAINT CHECK_DUE_DATES CHECK (DueByDate >= BorrowDate),
    CONSTRAINT CHECK_RETURN_DATES CHECK (ReturnedDate >= BorrowDate)
);


CREATE TABLE CATALOG_ITEM (
    CatalogID INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(200) NOT NULL,
    PublicationDate DATE NOT NULL,
    Language VARCHAR(50) NOT NULL,
    ImageUrl VARCHAR(250),
    
    CONSTRAINT CATALOGPK PRIMARY KEY (CatalogID)
);


CREATE TABLE LIBRARY_TRANSACTION_ITEM (
    TransactionID INT NOT NULL,
    CatalogID INT NOT NULL,

    CONSTRAINT PK_TRANSACTION_ITEM PRIMARY KEY (TransactionID, CatalogID),

    CONSTRAINT FK_TRANSACTION_ITEM_TRANSACTION FOREIGN KEY (TransactionID) REFERENCES LIBRARY_TRANSACTION(TransactionID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT FK_TRANSACTION_ITEM_CATALOG FOREIGN KEY (CatalogID) REFERENCES CATALOG_ITEM(CatalogID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE DVD (
    Dvd_ID INT NOT NULL,
    Publisher VARCHAR(100) NOT NULL,
    Duration INT NOT NULL,
    Format VARCHAR(50) NOT NULL,
    
    CONSTRAINT DVDPK PRIMARY KEY (Dvd_ID),
    CONSTRAINT CHECK_DURATION CHECK (Duration > 0),
    
    CONSTRAINT FK_DVD_CATALOG FOREIGN KEY (Dvd_ID) REFERENCES CATALOG_ITEM(CatalogID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE MAGAZINE (
    Magazine_ID INT NOT NULL,
    Publisher VARCHAR(100) NOT NULL,
    Issue VARCHAR(50) NOT NULL,
    Nameplate VARCHAR(100) NOT NULL,
    
    CONSTRAINT MAGAZINEPK PRIMARY KEY (Magazine_ID),
    
    CONSTRAINT FK_MAGAZINE_CATALOG FOREIGN KEY (Magazine_ID) REFERENCES CATALOG_ITEM(CatalogID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE BOOK (
    Book_ID INT NOT NULL,
    ISBN VARCHAR(20) NOT NULL,
    
    CONSTRAINT BOOKPK PRIMARY KEY (Book_ID),
    CONSTRAINT ISBNUNIQUE UNIQUE (ISBN),
    
    CONSTRAINT FK_BOOK_CATALOG FOREIGN KEY (Book_ID) REFERENCES CATALOG_ITEM(CatalogID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE AUTHOR (
    AuthorName VARCHAR(100) NOT NULL,
    Book_ID INT NOT NULL,
    
    CONSTRAINT AUTHORPK PRIMARY KEY (AuthorName, Book_ID),
    
    CONSTRAINT FK_AUTHOR_BOOK FOREIGN KEY (Book_ID) REFERENCES BOOK(Book_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);